// Background.jsx
const Background = ({ children }) => {
    return (
      <div className="bg-gradient-to-br from-gray-900 to-gray-700 min-h-screen flex items-center justify-center py-6 sm:py-12">
        {children}
      </div>
    );
  };
  
  export default Background;