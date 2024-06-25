type GameScore = [ number, number ];
type Player = number;
type Team = number;
interface GameState { score: GameScore };

abstract class Game<S extends GameState> {
    private gameStates: Array<S> = [];
    protected setState(state: S){
        this.gameStates[this.gameStates.length-1] = state;
    }
    public constructor();
    public constructor(initState?:S) { 
        if(initState)
            this.gameStates.push(initState);
        else
            this.gameStates.push(this.initState());
    };
    // add a point on scored team and return new game state
    public addScore(team: Team): S{
        const state = this.stateAfterScore(team);
        this.gameStates.push(state);
        return this.gameState();
    };
    // return whether the game ended based on current state 
    public abstract initState(): S;
    // return whether the game ended based on current state 
    public abstract winner(): Team | null;
    // return next game game state
    public abstract nextGame(): Game<S>;
    //
    protected abstract stateAfterScore(team: Team):S;
    // inverse a point and return reversed game state
    public rollBack(): S {
        const last: S = <S>this.gameStates.pop();
        if (this.gameStates.length == 0) this.gameStates.push(last);
        return this.gameState();
    };
    // return current game state
    public gameState():S{
        const tail = <S>this.gameStates.pop();
        this.gameStates.push(tail);
        return JSON.parse(JSON.stringify(this.gameStates.pop()));
    }
    public static playerNameMaps(names: Array<Array<string>>):{
        playerName: Array<Record<Player, string>>,
        namePlayer: Array<Record<string, Player>>
    }
    {
        const playerName:Array<Record<Player, string>> = [];
        const namePlayer:Array<Record<string, Player>> = [];
        names.forEach(((team)=>{
            const pn:Record<Player, string> = {};
            const np:Record<string, Player> = {};
            team.forEach((name, idx)=>{
                pn[idx] = name;
                np[name] = idx;
            })
            playerName.push(pn);
            namePlayer.push(np);
        }))
        return { playerName, namePlayer };

    }
    public static teamNameMaps(teamNames:Array<string>):{
        teamName: Record<Team, string>,
        nameTeam: Record<string, Team>
    }{
        const teamName: Record<Team, string> = {};
        const nameTeam: Record<string, Team> = {};
        teamNames.forEach((name, idx)=>{
            teamName[idx] = name;
            nameTeam[name] = idx;
        })
        return { teamName, nameTeam} ;
    }
}

export interface DoubleGameState extends GameState {
    "server": [Team, Player],
    "receiver": [Team, Player],
    "leftPlayer": [ Player, Player ]
}

export interface SingleGameState extends GameState {
    "server": Team
}

class DoubleGame extends Game<DoubleGameState> {
    public constructor (servingTeam:Team, server:Player, receiver:Player){
        super();
        const tail = <DoubleGameState>this.gameState();
        tail.server = [servingTeam, server];
        tail.receiver = [(servingTeam+1)%2, receiver];
        tail.leftPlayer = [(server+1)%2, (receiver+1)%2];
        this.setState(tail);

    }
    public initState(): DoubleGameState {
        return {
            score: [0, 0],
            server: [0, 0],
            receiver: [1, 0],
            leftPlayer: [1, 1]
        }
    }
    public nextGame(): Game<DoubleGameState> {
        if(this.winner()==null)throw new Error("game not ended yet");
        const state = <DoubleGameState>this.gameState();
        const servingTeam = state.server[0];
        const server = (state.server[1]+1)%2;
        const receiver = (state.receiver[1]+1)%2;
        return new DoubleGame(servingTeam, server, receiver);

    }
    public winner(): Team | null {
        const state = this.gameState();
        if(state==undefined)return null;
        const score = state.score;
        const leadTeam: Team = state.score[0] > state.score[1] ? 0 : 1;
        const lowerTeam: Team = (leadTeam + 1) % 2;
        if (score[leadTeam] < 21) return null;
        if (score[leadTeam] >= 30 || score[leadTeam] - score[lowerTeam] >= 2) return leadTeam;
        return null;
    }
    protected stateAfterScore(scoredTeam: Team): DoubleGameState {
        const currentState: DoubleGameState = <DoubleGameState>this.gameState();
        if (this.winner() != undefined) throw new Error("score added after game has ended");

        const newState = { ...currentState };
        newState.score[scoredTeam]++;
        if (currentState.server[0] == scoredTeam) {
            newState.leftPlayer[scoredTeam] = (currentState.leftPlayer[scoredTeam] + 1) % 2;
            newState.receiver = [currentState.receiver[0], (currentState.receiver[1] + 1) % 2];
        } else {
            newState.server = [(currentState.server[0] + 1) % 2, (currentState.leftPlayer[scoredTeam] + currentState.score[scoredTeam] % 2 ? 1 : 0) % 2];
            newState.receiver = [currentState.server[0], (currentState.leftPlayer[<Player>((scoredTeam + 1) % 2)] + currentState.score[scoredTeam] % 2 ? 1 : 0) % 2];
        }
        return newState;
    }
}

class SingleGame extends Game<SingleGameState> {
    public constructor (server:Team){
        super();
        const tail = <SingleGameState>this.gameState();
        tail.server = server;
        this.setState(tail);
    }
    public initState(): SingleGameState {
        return {
            score: [0, 0],
            server: 0
        }
    }
    public winner(): number | null {
        const state = this.gameState();
        if(state==undefined)return null;
        const score = state.score;
        const leadTeam: Team = state.score[0] > state.score[1] ? 0 : 1;
        const lowerTeam: Team = (leadTeam + 1) % 2;
        if (score[leadTeam] < 21) return null;
        if (score[leadTeam] >= 21 || score[leadTeam] - score[lowerTeam] >= 2) return leadTeam;
        return null;
    }
    public nextGame(): Game<SingleGameState> {
        if(this.winner()==null)throw new Error("game not ended yet");
        const state = <SingleGameState>this.gameState();
        return new SingleGame(state.server);
    }
    protected stateAfterScore(team: number): SingleGameState {
        const currentState: SingleGameState = <SingleGameState>this.gameState();
        if (this.winner() != undefined) throw new Error("score added after game has ended");
        const newState = { ...currentState };
        newState.score[team]++;
        newState.server = team;
        return newState;
    }
}

export enum rules {
    double,
    single
}

export class GameFactory {
    public static createGame(rule: rules, servingTeam: Team, server?: Player, receiver?: Player): Game<GameState> {
        if (rule == rules.double) return new DoubleGame(servingTeam, server=server||0, receiver=receiver||0);
        if (rule == rules.single) return new SingleGame(servingTeam);
        throw new Error("rule not supported");
    }

}