import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

//Email Template ID : template_5ztthpd
// Email Service ID : service_ygtanza
// Public Key : vBGBGFOUN09CDKEWQ

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const {target} = e;
    const {name, value} = e.target;

    setForm({ ...form, [name]:value})
  }

  const handleSubmit= (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if all fields are filled
  if (!form.name || !form.email || !form.message) {
    setLoading(false);
    alert('Please fill in all fields before submitting.');
    return;
  }
    //Email Template ID : template_5ztthpd
// Email Service ID : service_ygtanza
// Public Key : vBGBGFOUN09CDKEWQ

    emailjs.send(
      // Email Service ID
      'service_ygtanza', 
      //Email Template ID 
      'template_5ztthpd',
      {
        from_name : form.name,
        to_name: 'hicham',
        from_email : form.email,
        to_email : 'hichambahat0@gmail.com',
        message : form.message,

      },
      // Public Key
      'vBGBGFOUN09CDKEWQ'
     )
     .then(() => {
      setLoading(false);
      alert('Thank You for the message, I will get back to you as soon as possible . ')
     setForm({
      name:'', email: '', message : '',
     })
    }, (error) => {
      setLoading(false)
      console.log(error);
      alert('Something went wrong .')
    })
  }



  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
      variants={slideIn('left', "tween", 0.2, 1)}
      className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
        <p className={styles.sectionSubText}>Get In Touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8">

          {/* input For the name */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your Name
            </span>
            <input type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What is your name ?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          {/* input For the email */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your Email
            </span>
            <input type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What is your email ?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          {/* input For the message */}
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">
              Your message
            </span>
            <textarea 
            rows = "7"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="have you a Message For us ?"
            className="bg-tertiary py-4 px-6 placeholder:text-secondary
            text-white rounded-lg outlined-none border-none font-medium" />
          </label>

          <button type="submit"
          className="bg-tertiary py-3 px-8 outline-none w-fit text-white
          font-bold shadow-md shadow-primary rounded-xl">
          {loading? 'sending...' : 'send'}
          </button>
        </form>
      </motion.div>

      <motion.div  variants={slideIn('right', "tween", 0.2, 1)}
      className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>
    </div>
   );
};

export default SectionWrapper(Contact, "contact");
