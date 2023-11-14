import { getConcertDetail } from "@/api/concert";
import { Concert } from "@/types/concert";
import { useQuery } from "@tanstack/react-query";

const useConcertDetailQuery = (concertId: Concert["id"]) => {
  const query = useQuery({
    queryKey: ["useConcertDetailQuery", concertId],
    queryFn: () => getConcertDetail(concertId),
  });

  return query;
};

export default useConcertDetailQuery;
