import styles from './Loader.module.css'

const Loader = ({ height = 'normal', mt = false }) => {
    return (
        <div className={`${styles.wrapper} ${height === 'full' ? "vh-100" : ""} ${mt ? 'mt-5' : ''}`}>
            <div className={styles.btSpinner}></div>
        </div>
    )
}

export default Loader