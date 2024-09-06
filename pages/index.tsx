import MainLayout from "../layouts/main";
import ButtonSample from "./(components)/ButtonSample";

export default function Home() {
    return (
        <MainLayout>
            <h1>Welcome To BlazeUI</h1>
            <hr />
            <ButtonSample />
            <hr />
        </MainLayout>
    );
}
