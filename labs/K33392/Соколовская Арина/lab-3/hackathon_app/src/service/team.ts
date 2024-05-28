import { Participant, Team } from "../model/team";
import { ParticipantRepository } from "../repository/participant";
import { TeamRepository } from "../repository/team";

export class TeamService {
    private teamRepository: TeamRepository;
    private participantRepository: ParticipantRepository;

    constructor() {
        this.teamRepository = new TeamRepository();
        this.participantRepository = new ParticipantRepository();
    }

    async patch(id: number, team: Team): Promise<Team | null> {
        const updated_team = await this.teamRepository.patch(id, team);
        return updated_team;
    }

    async postParticipant(user_id: number, team_id: number): Promise<Participant | null> {
        const new_participant = await this.participantRepository.post(user_id, team_id);
        return new_participant;
    }
}