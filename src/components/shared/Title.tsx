

const Title = ({subtitle, title}) => {
        return (
                <div className="flex flex-col justify-center items-center py-6">
                <p className="text-green-600 text-xs md:text-xl font-extralight text-center">{subtitle}</p>
                <h2 className="text-blue-900 text-xl md:text-4xl font-bold text-center">{title}</h2>
                        
                </div>
        );
};

export default Title;