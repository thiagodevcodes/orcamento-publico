import styles from "../styles/Table.module.css";

export default function Header({ controlModal, title }) {
    return (
        <div className={styles.headerTable}>
            <div className={styles.headerButton}>
                <img src="/icons/Action.svg" alt="" />
                <h2>Tela de {title}</h2>
            </div>
            
            <button onClick={() => controlModal("post", true)}>Adicionar</button>
        </div>
    );
}