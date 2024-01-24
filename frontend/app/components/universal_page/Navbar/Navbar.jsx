import React from 'react'
import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <>
      <div className={styles.Nav}>
        {/*  <div className={styles.bookLogo}> <video src={booklogo} autoPlay loop muted /></div> */}
        <div className={styles.homebtnconatainer}>
          <div className={styles.Logo}>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/8/84/Official_logo_of_LNJPIT.svg/640px-Official_logo_of_LNJPIT.svg.png"
              alt="logo"
            />
          </div>

          <h1 className={styles.Title}>
            Loknayak Jai Prakash Institute of Technology
          </h1>
        </div>
      </div>
    </>
  );
}

export default Navbar
