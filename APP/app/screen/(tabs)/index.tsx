import { SafeAreaView, ScrollView } from "react-native";
import { Theme, Color } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import ImageSlider from "@/components/ImageSlider";
import EventList from "@/components/EventList";
import Header from "@/components/Header";
interface Event {
    imagesrc: string;
    date: [string, string, string]; // [day, month, year]
    name: string;
    numOfUser: number;
    address: string;
}
interface Image {
    url: string;
}

const index: React.FC = () => {
    const images: Image[] = [
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Blood_Donation/19251.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Drawing_Competition/115.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Harghar_Tiranga/65420.png",
        },
        {
            url: "https://www.sbpedutrust.org/PhotoGallery/Gallery/Debate_On_Beti_Bachavo/69019.png",
        },
    ];
    const events: Event[] = [
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPMJDgjBj23uThV8e0cYTaBv9ItBOfiAGmBQ&s",
            date: ["15", "FEB", "2025"],
            name: "Nasha Mukti Abhiyan",
            numOfUser: 300,
            address: "PAREKH COLLAGE-MAHUVA ",
        },
        {
            imagesrc:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLRye_ixJ3XtFBy0EifOmHlKw-U_QK9ZWRnw&s",
            date: ["1", "JUNE", "2001"],
            name: "Blood Donation",
            numOfUser: 300,
            address: "Motivadal, Mahuva,-364319",
        },
        {
            imagesrc:
                "https://www.shutterstock.com/image-vector/illustration-indian-people-wishing-happy-260nw-298508150.jpg",
            date: ["1", "JUNE", "2001"],
            name: "indian-people-wishing-happy",
            numOfUser: 300,
            address: "Motivadal, Mahuva,-364319",
        },
    ];
    return (
        <SafeAreaView style={Theme} className="gap-8"> 
            <Header />
            <ScrollView
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: "30",
                    paddingBottom: 200,
                }}
            >
                <StatusBar backgroundColor={`${Color["main-color"]}`} />
                <EventList events={events} />
                <ImageSlider images={images} title="Photos..." />
            </ScrollView>
        </SafeAreaView>
    );
};
export default index;
