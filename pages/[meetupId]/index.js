import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description}></meta>
                <MeetupDetail 
                    title={props.meetupData.title} 
                    address={props.meetupData.address} 
                    image={props.meetupData.image}
                    description={props.meetupData.description} 
                />
            </Head>
        </>
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('xxx-mongoUrl-xxx');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //only return the ids on each doc
    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => {
            return {
                params: { meetupId: meetup._id.toString() }
            }
        })
    }
}

export async function getStaticProps(context) {
    //fetch data for a single meetup
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('xxx-mongoUrl-xxx');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) }); //the meetupId comes from the URL params
    client.close();

    return {
        props: {
        meetupData: {
            id: selectedMeetup._id.toString(),
            title: selectedMeetup.title,
            address: selectedMeetup.address,
            image: selectedMeetup.image,
            description: selectedMeetup.description
        }
        }
    }
}

export default MeetupDetails;