import FootballModule from "./FootballModule";


class TeamModel extends FootballModule {
    constructor(props) {
        super(props);

        this.addTeam = `/api/${this.getLang()}/admin/football/team/add`;
    }


    addTeam(data) {

    }
}

export default TeamModel;