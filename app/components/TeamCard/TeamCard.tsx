import Image from "next/image";
import { Team } from "@/app/types/team";
import styles from './TeamCard.module.css'

export default function TeamCard({ team }: { team: Team }) {
    return (
        <div className={styles.container}>
            <Image
                src={team.strBadge}
                alt={team.strTeam}
                width={120}
                height={120}
                className={styles.badge}
            />

            <h2 className={styles.team}>{team.strTeam}</h2>
            <p>País: {team.strCountry}</p>
            <p>Liga: {team.strLeague}</p>
            <p>Estádio: {team.strStadium}</p>
        </div>
    );
}   