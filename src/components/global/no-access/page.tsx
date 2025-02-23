const UnauthorizedPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-black text-white">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-red-500 glitch">ACCESS DENIED</h1>
                <p className="text-gray-400 mt-2">You are not authorized to view this page.</p>
            </div>
        </div>
    );
}

export default UnauthorizedPage