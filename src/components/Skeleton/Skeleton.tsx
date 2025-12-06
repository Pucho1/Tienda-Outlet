
const Skeleton = () => {
	return (
		<div className="mx-auto w-full max-w-sm rounded-md p-4 ">
    		<div className="flex flex-col animate-pulse space-x-4">
				<div className="w-full h-70 bg-gray-200"></div>
				<div className="flex-1 space-y-6 py-1">
					<div className="h-2 rounded bg-gray-200"></div>
					<div className="space-y-3"> 
						<div className="grid grid-cols-3 gap-4">
							<div className="col-span-2 h-2 rounded bg-gray-200"></div>
							<div className="col-span-1 h-2 rounded bg-gray-200"></div>
						</div>     
						<div className="h-2 rounded bg-gray-200"></div>
					</div>
				</div>
			</div>
		</div>
	)
};

export default Skeleton;
