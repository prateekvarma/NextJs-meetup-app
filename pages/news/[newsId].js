import { useRouter } from 'next/router';

function DetailPage() {
  const router = useRouter();

  console.log(router.query.newsId); //the 'newsId' is the same name as the filename between the []

  return <h1>The Detail Page</h1>
}

export default DetailPage;