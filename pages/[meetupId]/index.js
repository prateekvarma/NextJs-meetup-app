import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetupDetails() {
    return <MeetupDetail title="dummy title" address='dummy address' image="https://images.pexels.com/photos/69371/pexels-photo-69371.jpeg?auto=compress&cs=tinysrgb&w=600" description="Dummy desc" />
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            {
                params: { meetupId: 'm1' }
            },
            {
                params: { meetupId: 'm2' }
            }
        ]
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