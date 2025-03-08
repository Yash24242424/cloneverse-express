
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Cookie className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Cookie Policy</h1>
            </div>
            
            <div className="prose prose-blue max-w-none">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
              
              <h2>1. What Are Cookies</h2>
              <p>
                As is common practice with almost all professional websites, 99baazaar uses cookies, which are tiny files that are downloaded to your computer, to improve your experience. This page describes what information they gather, how we use it, and why we sometimes need to store these cookies. We will also share how you can prevent these cookies from being stored, however, this may downgrade or 'break' certain elements of the site's functionality.
              </p>
              
              <h2>2. How We Use Cookies</h2>
              <p>
                We use cookies for a variety of reasons detailed below. Unfortunately, in most cases, there are no industry standard options for disabling cookies without completely disabling the functionality and features they add to this site. It is recommended that you leave on all cookies if you are not sure whether you need them or not in case they are used to provide a service that you use.
              </p>
              
              <h2>3. The Cookies We Set</h2>
              <h3>Account related cookies</h3>
              <p>
                If you create an account with us then we will use cookies for the management of the signup process and general administration. These cookies will usually be deleted when you log out, however in some cases, they may remain afterward to remember your site preferences when logged out.
              </p>
              
              <h3>Login related cookies</h3>
              <p>
                We use cookies when you are logged in so that we can remember this fact. This prevents you from having to log in every single time you visit a new page. These cookies are typically removed or cleared when you log out to ensure that you can only access restricted features and areas when logged in.
              </p>
              
              <h3>Orders processing related cookies</h3>
              <p>
                This site offers e-commerce or payment facilities and some cookies are essential to ensure that your order is remembered between pages so that we can process it properly.
              </p>
              
              <h3>Forms related cookies</h3>
              <p>
                When you submit data to through a form such as those found on contact pages or comment forms, cookies may be set to remember your user details for future correspondence.
              </p>
              
              <h3>Site preferences cookies</h3>
              <p>
                In order to provide you with a great experience on this site, we provide the functionality to set your preferences for how this site runs when you use it. In order to remember your preferences, we need to set cookies so that this information can be called whenever you interact with a page is affected by your preferences.
              </p>
              
              <h2>4. Third Party Cookies</h2>
              <p>
                In some special cases, we also use cookies provided by trusted third parties. The following section details which third party cookies you might encounter through this site.
              </p>
              <ul>
                <li>This site uses Google Analytics which is one of the most widespread and trusted analytics solutions on the web for helping us to understand how you use the site and ways that we can improve your experience. These cookies may track things such as how long you spend on the site and the pages that you visit so we can continue to produce engaging content.</li>
                <li>From time to time we test new features and make subtle changes to the way that the site is delivered. When we are still testing new features, these cookies may be used to ensure that you receive a consistent experience whilst on the site whilst ensuring we understand which optimizations our users appreciate the most.</li>
                <li>As we sell products it's important for us to understand statistics about how many of the visitors to our site actually make a purchase and as such this is the kind of data that these cookies will track. This is important to you as it means that we can accurately make business predictions that allow us to monitor our advertising and product costs to ensure the best possible price.</li>
              </ul>
              
              <h2>5. More Information</h2>
              <p>
                Hopefully, that has clarified things for you and as was previously mentioned if there is something that you aren't sure whether you need or not it's usually safer to leave cookies enabled in case it does interact with one of the features you use on our site.
              </p>
              <p>
                However, if you are still looking for more information then you can contact us through one of our preferred contact methods:
              </p>
              <ul>
                <li>Email: support@99baazaar.com</li>
                <li>Phone: +91 (XXX) XXX-XXXX</li>
                <li>Contact form on our website</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiePolicy;
