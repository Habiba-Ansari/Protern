const express = require("express");
const zod = require("zod");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const connectToDB = require("./db");
const { error } = require("console");
app.set('view engine', 'ejs');
app.use('/images',express.static('images'));
app.use('/css',express.static('css'));
app.use(bodyParser.json()); // Middleware to parse JSON bodies
// app.use(express.static(path.join(__dirname, "signup-form-server"))); // Serve static files
app.use(express.json()); // To parse JSON bodies
app.use(express.static(path.join(__dirname, 'public')));

// Serve the signup form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/HomePages/MainHome.html"));
});

app.get("/signup/student", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup/usersignup.html"));
});

app.get("/signup/startup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/signup/usersignup.html"));
});

// Zod validation schema for student signup
const studentSignupSchema = zod.object({
  studentFullName: zod.string().min(1, "Full Name is required"),
  studentEmail: zod.string().email("Invalid email address"),
  studentPassword: zod
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

// Zod validation schema for startup signup
const startupSignupSchema = zod.object({
  startupFullName: zod.string().min(1, "Full Name is required"),
  startupEmail: zod.string().email("Invalid email address"),
  startupPassword: zod
    .string()
    .min(8, "Password must be at least 8 characters long"),
});

// Endpoint to handle student signup
app.post("/signup/student", async (req, res) => {
  try {
    // Validate request body using Zod schema
    const validatedData = studentSignupSchema.parse(req.body);

    // Connect to the database
    const db = await connectToDB();
    const usersCollection = db.collection("students");

    // Prepare the new student object with correct field names
    const { studentFullName, studentEmail, studentPassword } = validatedData;
    const newUser = {
      fullName: studentFullName,
      email: studentEmail,
      password: studentPassword,
      createdAt: new Date(),
    };

    // Insert the new student into the database
    await usersCollection.insertOne(newUser);

    // Send a success response
    res.status(200).json({ message: "Signup successful!" });
    // res.render("login");
  } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res
      .status(500)
      .json({ message: "Error occurred during signup", error: error.message });
  }
});

// Endpoint to handle startup signup
app.post("/signup/startup", async (req, res) => {
  try {
    // Validate request body using Zod schema
    const validatedData = startupSignupSchema.parse(req.body);

    // Connect to the database
    const db = await connectToDB();
    const usersCollection = db.collection("startups");

    // Prepare the new startup object with correct field names
    const { startupFullName, startupEmail, startupPassword } = validatedData;
    const newUser = {
      fullName: startupFullName,
      email: startupEmail,
      password: startupPassword,
      createdAt: new Date(),
    };

    // Insert the new startup into the database
    await usersCollection.insertOne(newUser);

    // Send a success response
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res
      .status(500)
      .json({ message: "Error occurred during signup", error: error.message });
  }
});

app.get("/feedbacks", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/feedback/feedback.html"));
});

app.post("/feedbacks", async (req, res) => {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("feedbacks");
    const { Name, email, feedbackType, rating, comments } = req.body;
    // Prepare the new student object with correct field names
    const newUser = {
      f_Name: Name,
      f_email: email,
      f_feedbackType: feedbackType,
      f_rating: rating,
      f_comment: comments,
      f_posted_at: new Date(),
    };

    // Insert the new student into the database
    await usersCollection.insertOne(newUser);

    // Send a success response
    res.status(200).json({ message: "Form submited successfully" });
  } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res.status(500).json({ message: "Error occurred", error: error.message });
  }
});

// app.get("/Home/student", (req, res) => {
//   res.sendFile(path.join(__dirname, "login", "student_login.html"));
// });

app.get("/Home/student",(req,res)=>{
  res.sendFile(path.join(__dirname, "Homepages", "studentHome.html"));
})

app.post("/Home/student", async (req, res) => {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("students");
    const { email, password } = req.body;
    const user =await usersCollection.findOne({ email: email });

    if(user && user.password===password){
        // res.status(200).json({message:"login successful"});
        res.status(200).json({ message: "Login successful", redirectUrl: "/Home/student" });
    }else{
        res.status(500).json({message:"wrong credintials",error:error.message });
        console.log(error.message);
    }
    } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res.status(500).json({ message: "Error occurred", error: error.message });
    console.log(error.message);
  }
});

app.get("/login/startup", (req, res) => {
  res.sendFile(path.join(__dirname,"../public/login/employerLogin.html"));
});

app.post("/login/startup", async (req, res) => {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("startups");
    const { email, password } = req.body;
    const user =await usersCollection.findOne({ email: email });

    if(user && user.password===password){
        // res.status(200).json({message:"login successful"});
        res.status(200).json({ message: "Login successful", redirectUrl: "/Home/startup" });
    }else{
        res.status(500).json({message:"wrong credintials",error:error.message });
        console.log(error.message);
    }
    } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res.status(500).json({ message: "Error occurred", error: error.message });
    console.log(error.message);
  }
});

app.get("/login/student",(req,res)=>{
  res.sendFile(path.join(__dirname,"../public/login/userlogin.html"));
})

app.post("/login/student", async (req, res) => {
  try {
    const db = await connectToDB();
    const usersCollection = db.collection("students");
    const { email, password } = req.body;
    const user =await usersCollection.findOne({ email: email });

    if(user && user.password===password){
        // res.status(200).json({message:"login successful"});
        res.status(200).json({ message: "Login successful", redirectUrl: "/Home/student" });
    }else{
        res.status(500).json({message:"wrong credintials",error:error.message });
        console.log(error.message);
    }
    } catch (error) {
    console.error(error);
    // Handle validation or database errors
    res.status(500).json({ message: "Error occurred", error: error.message });
    console.log(error.message);
  }
});



app.get("/Home/startup",(req,res)=>{
  res.sendFile(path.join(__dirname, "Homepages", "emphome.html"));
})
app.get("/startup/postjob",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","jobpost.html"));
})

app.get("/startup/postjob",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","jobpost.html"));
})

app.get("/startup/interview",(req,res)=>{
   res.sendFile(path.join(__dirname,"features","interview.html"));
})

app.get("/safety-tips",(req,res)=>{
   res.sendFile(path.join(__dirname,"features","tip.html"));
})

app.get("/student/scholarship",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","scholar.html"));
})

app.post("/postinternship", async (req, res) => {
  try {
    const internshipData = req.body;
    
    // Validate the internship data
    if (!internshipData.internship_title || !internshipData.internship_description) {
      return res.status(400).send({ error: "Internship title and description are required" });
    }

    // Insert the internship data into the database
    const result = await collection.insertOne(internshipData);
    console.log(`Internship posted successfully! _id: ${result.insertedId}`);

    // Send back a redirect URL
    res.send({ redirectUrl: "/internships" }); // Replace with the actual URL you want to redirect to
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/resumeBuilder",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","resbuilder.html"))
})



app.get('/viewinternships', async (req, res) => {
  try {
    const db=await connectToDB();
    const collection = db.collection('internships');
    const internship = await collection.find().toArray();
    console.log(internship);
    res.render('internship', { internship });
  } catch (err) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});

app.get('/viewToatalInternships', async (req, res) => {
  try {
    const db=await connectToDB();
    const collection = db.collection('internships');
    const internship = await collection.find().toArray();
    console.log(internship);
    res.render('internship', { internship });
  } catch (err) {
    res.status(500).send('Error fetching data from MongoDB');
  }
});
app.get("/student/interviewprep",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","intervwprep.html"));
})
app.get("/tips",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","interviewTip.html"));
}) 

app.get("/safetyTips",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","tip.html"));
})

app.get("/hire",(req,res)=>{
  res.sendFile(path.join(__dirname,"features","filter.html"))
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
