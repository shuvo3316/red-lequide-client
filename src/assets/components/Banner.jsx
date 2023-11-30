
const Banner = () => {
    return (
       

<div className=" p-6 py-12 dark:bg-violet-400 dark:text-gray-900">
	<div className="  mx-auto">
        <img src="https://i.ibb.co/5WvWNRP/donation.jpg" alt="" />
		<div className="relative -mt-24 flex flex-col lg:flex-row items-center justify-between">
			<h2 className="text-center text-rose-400 text-6xl tracki font-bold">
				GIVE BLOOD - SAVE LIFE
			</h2>
			
            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Join as a doner</button>
            <button type="button" className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900">Search a doner</button>
		</div>
	</div>
</div>


    );
};

export default Banner;