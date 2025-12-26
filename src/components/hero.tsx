const Hero = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image dengan Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://i.bandori.party/u/c/art/2073Rinko-Shirokane-Cool-Antique-Bookstore-Tour-pR5Pbm.png"
                    alt="Mountain landscape"
                    className="w-full h-full object-cover"
                    loading="eager"
                />
                {/* Overlay gradient untuk readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge/Tag */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-white text-sm font-medium">Explore & Inspire</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        Welcome To
                        <span className="block bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                            Kira Blog
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
                        Discover insights, tutorials, and stories for curious minds like yours
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                        href="#blog-cards"
                        className="group relative px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto cursor-pointer">
                            <span className="relative z-10">Start Exploring</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        
                        <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 w-full sm:w-auto">
                            Learn More
                        </button>
                    </div>

                  
                </div>
            </div>


            {/* Wave SVG Bottom */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
                <svg viewBox="0 0 1440 120" className="w-full h-auto">
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                    ></path>
                </svg>
            </div>
        </div>
    );
};

export default Hero;