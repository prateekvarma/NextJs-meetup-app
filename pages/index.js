import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  { id: 'm1', title: 'First meetup', image: 'https://images.pexels.com/photos/167385/pexels-photo-167385.jpeg?auto=compress&cs=tinysrgb&w=600', address: '515 Goodwill Rd, Round Island, AA', description: 'This is the first meetup' },
  { id: 'm2', title: 'Second meetup', image: 'https://images.pexels.com/photos/258804/pexels-photo-258804.jpeg?auto=compress&cs=tinysrgb&w=600', address: '516 Goodwill Rd, Glittery Mountain, AA', description: 'This is the second meetup' }
];

function HomePage() {
  return (
      <MeetupList meetups={DUMMY_MEETUPS} />
    )
}

export default HomePage;