"use client";

import { createContext, useContext, useState } from "react";
import { Team } from "@/app/types/team";
import { getTeamByName } from "@/app/services/sportsdb";
import { TeamContextType } from "../types/teamContextType";

const TeamContext = createContext<TeamContextType | null>(null);

export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [team, setTeam] = useState<Team | null>(null);
    const [search, setSearch] = useState("");

    async function searchTeam() {
        if (!search) return;
        const result = await getTeamByName(search);
        setTeam(result);
    }

    function resetTeam() {
        setTeam(null);
        setSearch("");
    }

    return (
        <TeamContext.Provider
            value={{
                team,
                search,
                setSearch,
                searchTeam,
                resetTeam,
            }}
        >
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    if (!context) {
        throw new Error("useTeam deve ser usado dentro de TeamProvider");
    }
    return context;
}
