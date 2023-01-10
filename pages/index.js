import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  { id: 'm1', title: 'First meetup', image: 'https://images.pexels.com/photos/167385/pexels-photo-167385.jpeg?auto=compress&cs=tinysrgb&w=600', address: '515 Goodwill Rd, Round Island, AA', description: 'This is the first meetup' },
  { id: 'm2', title: 'Second meetup', image: 'https://images.pexels.com/photos/258804/pexels-photo-258804.jpeg?auto=compress&cs=tinysrgb&w=600', address: '516 Goodwill Rd, Glittery Mountain, AA', description: 'This is the second meetup' }
];

function HomePage(props) {

  return (
      <MeetupList meetups={props.meetups} />
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