import Link from "next/link";
import React from "react";
import styles from "./BottomNavbar.module.css";
import Icon from "@/components/icons";
import { Cookie } from "@/utils/cookie";

const BottomNavbar = () => {
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    if (Cookie.getUserId() !== null) {
      setUserId(Cookie.getUserId() as string);
    }
  }, []);

  return (
    <nav className={styles["bottom-navbar"]}>
      <Link href="/main" className={styles["bottom-navbar__item"]}>
        <Icon.Home />
      </Link>
      <Link
        href={`/profile/${userId}`}
        className={styles["bottom-navbar__item"]}
      >
        <Icon.Profile />
      </Link>
      <Link href="/friends" className={styles["bottom-navbar__item"]}>
        <Icon.Friends />
      </Link>
      <Link href="/recommendation" className={styles["bottom-navbar__item"]}>
        <Icon.Recommendation />
      </Link>
    </nav>
  );
};

export default BottomNavbar;
