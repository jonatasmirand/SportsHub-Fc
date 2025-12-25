import { Team } from "./team";

export interface TeamContextType  {
    team: Team | null;
    search: string;
    setSearch: (value: string) => void;
    searchTeam: () => Promise<void>;
    resetTeam: () => void;
};