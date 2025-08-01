import ContactExperience from "../components/models/contact/ContactExperience";

const Contact = () => {
  return (
    <section id="contact" className="md:py-16 py-8 relative">
      <div className="container mx-auto flex md:flex-row flex-col md:items-center">
        <div className="md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6">Contact Team Morgan</h2>
          <p className="mb-8">
            Have questions about voting for Bright Morgan? Want to support the campaign? 
            Reach out to us today!
          </p>
          
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Your Name</label>
              <input 
                type="text"
                id="name"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">Email Address</label>
              <input 
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                className="w-full p-3 border border-gray-300 rounded"
                placeholder="How would you like to support Bright Morgan?"
              ></textarea>
            </div>
            
            <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
        
        <div className="md:w-1/2 h-[500px] relative">
          <ContactExperience />
        </div>
      </div>
    </section>
  );
};

export default Contact;