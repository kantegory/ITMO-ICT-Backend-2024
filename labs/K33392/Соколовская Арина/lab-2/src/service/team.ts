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

    async patch(team: Team): Promise<Team | null> {
        const updated_team = await this.teamRepository.patch(team.id, team);
        return updated_team;
    }

    async postParticipant(participant: Participant): Promise<Participant | null> {
        const new_participant = await this.participantRepository.post(participant);
        return new_participant;
    }
}