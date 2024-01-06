import {cards} from "../lib/data"
import Card from '../components/dashboard/card/Card'
import Transactions from '../components/dashboard/transactions/Transactions'
import Chart from '../components/dashboard/chart/Chart'
import styles from "../components/dashboard/dashboard.module.css"
import Rightbar from "../components/dashboard/rightbar/Rightbar"

const Page = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          {cards.map((item) => (
            <Card item={item} key={item.id} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  )
}

export default Page
