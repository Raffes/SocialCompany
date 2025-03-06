import React from 'react'
import Head from '../Helper/Head'
import useFetch from '../../Hooks/useFetch';
import { GET_STATS } from '../../api';
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import UserStatsGraphs from './UserStatsGraphs';

const UserStats = () => {
  const { data, error, loading, request } = useFetch();
  
  React.useEffect(() => {
    async function getData() {
      const token = window.localStorage.getItem("token");
      const { url, options } = GET_STATS(token);
      await request(url, options);
    }
    getData();
  }, [request])

  if(loading) return <Loading />
  if(error) return <Error error={error} />
  if(data) {
    return (
      <div>
        <Head title="Estatísticas" />
        <UserStatsGraphs data={data} />
      </div>
    )
  } else return null;
}

export default UserStats
