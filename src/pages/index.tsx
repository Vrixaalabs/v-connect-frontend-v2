import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/navigation/Navbar';
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const features = [
  {
    icon: '🎓',
    title: 'Campus Life',
    description: 'Stay connected with everything happening on campus.',
  },
  {
    icon: '📢',
    title: 'Announcements',
    description: 'Never miss important updates and announcements.',
  },
  {
    icon: '👥',
    title: 'Club Management',
    description: 'Join and manage university clubs all in one place.',
  },
  {
    icon: '🔍',
    title: 'Lost & Found',
    description: 'Easy way to report and find lost items on campus.',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Navbar />
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 -z-10" />
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center space-y-8"
          >
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-7xl font-bold text-blue-900"
            >
              Welcome to V-Connect
            </motion.h1>
            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            >
              Your all-in-one platform for campus life, social networking, and academic success.
            </motion.p>
            <motion.div variants={fadeIn} className="space-x-4">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Everything You Need
            </motion.h2>
            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              Discover all the features that make campus life better
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: index * 0.2,
                    },
                  },
                }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="container mx-auto px-4 text-center"
        >
          <motion.h2
            variants={fadeIn}
            className="text-3xl md:text-4xl font-bold mb-8"
          >
            Ready to Get Started?
          </motion.h2>
          <motion.div variants={fadeIn}>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg px-8 bg-white text-blue-900 hover:bg-gray-100"
            >
              <Link to="/signup">Join V-Connect Today</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
