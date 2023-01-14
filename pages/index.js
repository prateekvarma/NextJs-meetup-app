import Head from "next/head"; // allows you to add meta tags to head
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse through a list of active React meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
    )
}

// export async function getServerSideProps(context) {
//   // This function is only applicable when you need to pull data on every single request. Still is a SSG.
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// Below 'getStaticProps' works better here, as the content won't be as dynamic
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect('xxx-mongoUrl-xxx');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray(); //find() by default finds all collections

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        return {
          title: meetup.title,
          address: meetup.address,
          image: meetup.image,
          id: meetup._id.toString() //this converts the strange MongoDB id-object to string
        }
      })
    }
  }
}

export default HomePage;