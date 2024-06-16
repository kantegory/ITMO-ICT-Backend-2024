import { Request, Response } from "express"
import { HackathonService } from "../service/hackathon";
import { SolutionService } from "../service/solution";
import { Solution } from "../model/solution";
import axios from "axios";
import { SolutionRepository } from "../repository/solution";
import { TeamRepository } from "../repository/team";

const solutionService = new SolutionService();
const solutionRepository = new SolutionRepository();
const teamRepository = new TeamRepository();

exports.get_solution = async (req: Request, res: Response) => {
    try {
        const allowed = ['admin', 'curator', 'jury'];

        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }

        let user_role = "";
        await axios({
            method: 'get',
            url: 'http://localhost:8000/auth/users/role',
            headers: {}, 
            data: {
              token: token,
            }
          }).then((res) => {
            user_role = res.data;
        });

        if (!allowed.includes(user_role)) {
            let user_id = 0;
            await axios({
                method: 'get',
                url: 'http://localhost:8000/auth/users/get_id',
                headers: {}, 
                data: {
                  token: token,
                }
              }).then((res) => {
                user_id = res.data;
            });

            const solution_id = Number(req.params.id);
            const solution = await solutionRepository.findById(solution_id);
            if (!solution) {
                return res.status(404).json({message: "Solution not found"});
            }
            const team_id = solution.team_id;
            const team = await teamRepository.findByPk(team_id);
            if (!team || team.leader_id !== user_id) {
                return res.status(403).json({message: "Access Denied"});
            }
        }

        const solution = await solutionService.findById(Number(req.params.id));
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};

exports.patch_solution = async (req: Request, res: Response) => {
    try {
        if (!req.headers.authorization) {
            return res.status(403).json({message: "Unauthorized"});
        }
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Unauthorized"});
        }
        
        let user_id = 0;
        await axios({
            method: 'get',
            url: 'http://localhost:8000/auth/users/get_id',
            headers: {}, 
            data: {
                token: token,
            }
            }).then((res) => {
            user_id = res.data;
        });
        const solution_id = Number(req.params.id);
        const db_solution = await solutionRepository.findById(solution_id);
        if (!db_solution) {
            return res.status(404).json({message: "Solution not found"});
        }
        const team_id = db_solution.team_id;
        const team = await teamRepository.findByPk(team_id);
        if (!team || team.leader_id !== user_id) {
            return res.status(403).json({message: "Access Denied"});
        }

        const solution = await solutionService.patch(Number(req.params.id), req.body as Solution)
        if (solution != null) res.send(JSON.stringify(solution));
    } catch (e) {
        if (e instanceof Error) {
            res.send({ error: e.message });
        }
    }
};