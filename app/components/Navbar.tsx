"use client";

export default function Navbar() {
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            {/* Empty space for balance */}
          </div>

          <div className="flex-1 flex justify-center">
            <div className="flex space-x-6 bg-gray-900/50 backdrop-blur-sm rounded-full px-8 py-3 border border-gray-800">
              {[
                { id: "about", text: "About" },
                { id: "skills", text: "Skills" },
                { id: "certificates", text: "Certificates" },
                { id: "projects", text: "Projects" },
                { id: "contact", text: "Contact" }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-300 hover:text-purple-300 transition-colors px-4 py-1 rounded-full hover:bg-purple-900/20 cursor-pointer"
                >
                  {item.text}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-end">
            <div className="flex space-x-3">
              <a
                href="https://www.linkedin.com/in/nirmalasari-rodito-sulnas-159845344"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                {/* LinkedIn Icon */}
              </a>
              <a
                href="https://instagram.com/nrmlardt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                {/* Instagram Icon */}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}