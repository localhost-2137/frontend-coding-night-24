import Background from "@/Assets/background.png";
import Mars from "@/Assets/mars.jpg";
import useItems from "@/hooks/useItems.tsx";
import ItemsTable from "@/components/itemsTable.tsx";
import Wrapper from "@/Layout/Wrapper.tsx";

export default function Storage() {

    const {data, status} = useItems();

    return (
        <div className="w-screen h-screen flex lg:items-center overflow-y-auto overflow-x-hidden lg:justify-center"
             style={{background: `url(${Background})`}}>
            <img
                src={Mars}
                alt="Mars"
                className="right-0 fixed w-1/2 top-0 ml-32"
            />
            <div
                className="2xl:w-2/3 xl:w-4/5 w-full mx-4 lg:h-4/5 z-30 gap-4 py-3">
                <h2 className="text-3xl text-white py-2">Aktualny Stan Magazynu</h2>
                <hr/>
                <div className="py-2 flex flex-col gap-4">
                    {status === "pending" && <p className="text-white">Ładowanie...</p>}
                    {status === "success" && <Wrapper className="my-2">
                        <ItemsTable data={data!.data}/>
                    </Wrapper>}
                </div>
            </div>
        </div>
    )
}