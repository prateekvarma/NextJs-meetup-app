import Head from "next/head";
import { useRouter } from "next/router"; 
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log('Function NewMeetupPage: ', data);
    router.push('/');
  }

  return (
    <>
      <Head>
        <title>React Meetups form</title>
        <meta name='description' content='Meetup form to create a new meetup!'></meta>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
      </Head>
    </>
  )
}

export default NewMeetupPage;