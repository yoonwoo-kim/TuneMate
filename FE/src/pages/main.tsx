import styles from "@/styles/MainPage.module.css";
import { ConcertSearchOption } from "@/types/concert";
import useConcertsQuery from "@/hooks/queries/concert/useConcertsQuery";
import ConcertCard from "@/components/concert/ConcertCard/ConcertCard";
import MainContent from "@/components/container/MainContent/MainContent";
import React, { useCallback, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useRecommendationSongsQuery from "@/hooks/queries/recommendation/useRecommendationSongsQuery";
import { Storage } from "@/utils/storage";
import ConcertImage from "@/components/image/ConcertImage/ConcertImage";
import usePlayList from "@/hooks/usePlayList";

const initConcertSearchOption: ConcertSearchOption = {
  type: "genre",
  option: "Bal",
};

const MainPage = () => {
  const [username, setUsername] = useState<string>("");
  const { data: concerts } = useConcertsQuery(initConcertSearchOption);
  const { data: tracks } = useRecommendationSongsQuery();
  const { changePlayList } = usePlayList();
  const router = useRouter();

  const onConcert = useCallback(() => {
    router.push("/concerts");
  }, []);

  const onPlayer = useCallback(() => {
    router.push("/player");
  }, []);

  useEffect(() => {
    setUsername(Storage.getUserName());
  }, []);

  return (
    <div className={styles["main-page"]}>
      <MainContent
        className={styles["main-page__content"]}
        title={
          <p>
            {username && `${username}님을 위한 `}
            <span className="blue">공연</span>
          </p>
        }
        onClick={onConcert}
      >
        <ul className={styles["main-page__content--item-container"]}>
          {concerts?.map((concert) => (
            <ConcertCard className={styles["main-page__content--item"]} item={concert} />
          ))}
        </ul>
      </MainContent>
      <MainContent
        className={styles["main-page__content"]}
        title={
          <p>
            {username && `${username}님을 위한 `}
            <span className="blue">추천곡</span>
          </p>
        }
        onClick={onPlayer}
      >
        <ul className={styles["main-page__content--item-container"]}>
          {tracks?.map((track) => (
            <li className={styles["main-page__content--item"]}>
              <ConcertImage
                src={track.album.images[0].uri}
                alt={track.name}
                type="list"
                onClick={() => changePlayList(track)}
              />
            </li>
          ))}
        </ul>
      </MainContent>
    </div>
  );
};

export default MainPage;
