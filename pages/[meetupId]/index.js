import { MongoClient } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return <MeetupDetail 
                title="dummy title" 
                address='dummy address' 
                image="https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=600" 
                description="Dummy desc" 
            />
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('xxx-mongoUrl-xxx');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); //only return the ids on eahc doc
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
    console.log('Thy Id: ', meetupId);

    return {
        props: {
        meetupData: {
            id: meetupId,
            title: "dummy title", 
            address: "dummy address",
            image: "https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=600",
            description: "Dummy desc"
            }
        }
    }
}

export default MeetupDetails;