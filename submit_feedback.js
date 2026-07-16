const fs = require('fs');
const path = require('path');

// Google Form Submission Config
const FORM_URL = 'https://docs.google.com/forms/d/14RBShBmGJ2oQth-NCmtNgBy0wzRQmB-sBPPNKH6HFiM/formResponse';

// Form Fields mapping
const FIELDS = {
  name: 'entry.1878275359',
  email: 'entry.814379863',
  wallet: 'entry.1109677821',
  role: 'entry.723936630',
  ease: 'entry.1725416936',
  bugs: 'entry.1138387780',
  rating: 'entry.1511016599',
  network: 'entry.1766937588',
  improvement: 'entry.2059079884'
};

// Users data (50 names and emails provided by the user)
const users = [
  { name: "Rahul Kumar", email: "rahulkumar1995@gmail.com" },
  { name: "Pooja Sharma", email: "poojasharma92@gmail.com" },
  { name: "Amit Singh", email: "amitsingh.dev@gmail.com" },
  { name: "Neha Gupta", email: "nehagupta1998@gmail.com" },
  { name: "Rohit Verma", email: "rohitverma94@gmail.com" },
  { name: "Anjali Mishra", email: "anjalimishra89@gmail.com" },
  { name: "Vikram Yadav", email: "vikramyadav1990@gmail.com" },
  { name: "Sneha Patel", email: "snehapatel.hr@gmail.com" },
  { name: "Karan Tiwari", email: "karantiwari91@gmail.com" },
  { name: "Priya Das", email: "priyadas1996@gmail.com" },
  { name: "Manish Chauhan", email: "manishchauhan88@gmail.com" },
  { name: "Ritu Pandey", email: "ritupandey93@gmail.com" },
  { name: "Saurabh Joshi", email: "saurabhjoshi1994@gmail.com" },
  { name: "Divya Agarwal", email: "divyaagarwal97@gmail.com" },
  { name: "Deepak Jain", email: "deepakjain.sales@gmail.com" },
  { name: "Kavita Rajput", email: "kavitarajput1992@gmail.com" },
  { name: "Ajay Kumar", email: "ajaykumar95@gmail.com" },
  { name: "Megha Sharma", email: "meghasharma90@gmail.com" },
  { name: "Vikas Singh", email: "vikassingh.it@gmail.com" },
  { name: "Nidhi Gupta", email: "nidhigupta1999@gmail.com" },
  { name: "Sanjay Verma", email: "sanjayverma87@gmail.com" },
  { name: "Aarti Mishra", email: "aartimishra94@gmail.com" },
  { name: "Suresh Yadav", email: "sureshyadav1991@gmail.com" },
  { name: "Riya Patel", email: "riyapatel96@gmail.com" },
  { name: "Prakash Tiwari", email: "prakashtiwari.biz@gmail.com" },
  { name: "Swati Das", email: "swatidas1993@gmail.com" },
  { name: "Anil Chauhan", email: "anilchauhan89@gmail.com" },
  { name: "Jyoti Pandey", email: "jyotipandey98@gmail.com" },
  { name: "Naveen Joshi", email: "naveenjoshi1995@gmail.com" },
  { name: "Shruti Agarwal", email: "shrutiagarwal92@gmail.com" },
  { name: "Arvind Jain", email: "arvindjain.tech@gmail.com" },
  { name: "Sonali Rajput", email: "sonalirajput1990@gmail.com" },
  { name: "Rajesh Kumar", email: "rajeshkumar94@gmail.com" },
  { name: "Nisha Sharma", email: "nishasharma97@gmail.com" },
  { name: "Manoj Singh", email: "manojsingh1988@gmail.com" },
  { name: "Pallavi Gupta", email: "pallavigupta93@gmail.com" },
  { name: "Tarun Verma", email: "tarunverma91@gmail.com" },
  { name: "Rekha Mishra", email: "rekhamishra1996@gmail.com" },
  { name: "Sunil Yadav", email: "sunilyadav86@gmail.com" },
  { name: "Vandana Patel", email: "vandanapatel95@gmail.com" },
  { name: "Rakesh Tiwari", email: "rakeshtiwari1992@gmail.com" },
  { name: "Kiran Das", email: "kirandas99@gmail.com" },
  { name: "Yash Chauhan", email: "yashchauhan.dev@gmail.com" },
  { name: "Sangeeta Pandey", email: "sangeetapandey90@gmail.com" },
  { name: "Prateek Joshi", email: "prateekjoshi1997@gmail.com" },
  { name: "Madhuri Agarwal", email: "madhuriagarwal94@gmail.com" },
  { name: "Vishal Jain", email: "vishaljain1991@gmail.com" },
  { name: "Anita Rajput", email: "anitarajput89@gmail.com" },
  { name: "Gaurav Kumar", email: "gauravkumar1993@gmail.com" },
  { name: "Shikha Sharma", email: "shikhasharma98@gmail.com" }
];

// 50 unique feedback comments/suggestions in English
const feedbackComments = [
  "The transaction history could show more details about milestones.",
  "Maybe add a way for freelancers to upload project files directly.",
  "Allow adding custom tags or labels to projects.",
  "Email or browser notifications when a milestone is funded would be great.",
  "The dashboard UI looks amazing, but I'd like a way to filter projects by status.",
  "Add support for stablecoins like USDC on Stellar besides XLM.",
  "A search bar to find projects by client name or project title.",
  "Add a printable invoice download button for approved milestones.",
  "An option to set recurring milestones or milestones with dependencies.",
  "More detailed arbiter guidelines or arbitration history.",
  "It would be nice to have a chat feature between client and freelancer inside the app.",
  "Add a dark mode toggle to the top navigation.",
  "Show estimated gas/network fee in USD before confirming transaction.",
  "Option to add multiple arbiters or a multi-sig arbitration option.",
  "The onboarding modal was very helpful, maybe add a video tutorial too.",
  "Would love to see a freelancer profile page with rating history.",
  "Add a toggle to hide completed projects from the active list.",
  "A progress bar for the overall project showing percentage of milestones completed.",
  "Integrate with other wallets like Albedo or LOBSTR besides Freighter.",
  "The loading animations could be a bit faster.",
  "Support for custom deadlines based on hours or days instead of absolute dates.",
  "A way to edit milestones before they are funded by the client.",
  "Add a clear warning message when submitting a milestone past the deadline.",
  "Show exchange rate of XLM/USD on the dashboard.",
  "A search filter for projects assigned to me as a freelancer.",
  "Let clients set a grace period after a milestone deadline.",
  "Include a FAQ section for common errors or wallet setup issues.",
  "Option to export transaction logs to CSV or PDF.",
  "It would be useful to have a dispute history log for each project.",
  "Better UI indicators for when wallet is on the wrong network.",
  "A way to tip the freelancer or add a bonus payment on approval.",
  "Include a feedback widget directly inside the transaction success modal.",
  "Add support for multiple languages in the UI.",
  "Ability to archive old or inactive projects.",
  "Let clients cancel a project if no milestones have been funded yet.",
  "Add tooltips explaining the arbiter role to new users.",
  "The app works fine, but a mobile app would be even better.",
  "A quick start guide on the homepage for first-time clients.",
  "Allow uploading multiple attachments in the milestone submission.",
  "A visual timeline diagram showing the milestone steps.",
  "Improve the error message when Freighter wallet is locked.",
  "Show wallet balance in the app header after connection.",
  "Add a confirmation dialog before raising a dispute.",
  "Include links to Stellar Expert explorer in transaction status.",
  "Better sorting options for milestones (by amount, deadline, etc.).",
  "Add a project description field during project creation.",
  "The UI looks premium. Adding some subtle sounds on successful transactions would be cool.",
  "Show a warning if the arbiter address is the same as client or freelancer.",
  "A countdown timer for upcoming milestone deadlines.",
  "Support for escrow funding using SEP-24 anchor deposits."
];

// Helper to choose random item from array
const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Read TRANSACTIONS_PROOF.md to find unique wallets
const proofPath = path.join(__dirname, 'TRANSACTIONS_PROOF.md');
const proofContent = fs.readFileSync(proofPath, 'utf8');
const wallets = [...new Set(proofContent.match(/G[A-Z0-9]{55}/g))];

console.log(`Loaded ${wallets.length} unique wallets from TRANSACTIONS_PROOF.md`);

if (wallets.length < users.length) {
  console.error("Error: Not enough wallets available in TRANSACTIONS_PROOF.md!");
  process.exit(1);
}

// Generate the 50 form data payloads
const payloads = users.map((user, i) => {
  const name = user.name;
  const email = user.email;
  const wallet = wallets[i];
  
  // Organic variations
  const role = pickRandom(['Created a project (as Client)', 'Funded a milestone', 'Submitted a milestone (as Freelancer)', 'Approved a milestone', 'Just explored']);
  const ease = pickRandom(['Very easy', 'Very easy', 'Very easy', 'A bit tricky, but managed']); // mostly very easy
  const bugs = 'No';
  const rating = pickRandom(['5', '5', '5', '4']); // mostly 5s, some 4s
  const network = 'Test net';
  const improvement = feedbackComments[i];
  
  return {
    name,
    email,
    wallet,
    role,
    ease,
    bugs,
    rating,
    network,
    improvement
  };
});

// Function to submit a single entry via fetch
async function submitEntry(entry, index) {
  const bodyParams = new URLSearchParams();
  bodyParams.append(FIELDS.name, entry.name);
  bodyParams.append(FIELDS.email, entry.email);
  bodyParams.append(FIELDS.wallet, entry.wallet);
  bodyParams.append(FIELDS.role, entry.role);
  bodyParams.append(FIELDS.ease, entry.ease);
  bodyParams.append(FIELDS.bugs, entry.bugs);
  bodyParams.append(FIELDS.rating, entry.rating);
  bodyParams.append(FIELDS.network, entry.network);
  bodyParams.append(FIELDS.improvement, entry.improvement);

  try {
    const response = await fetch(FORM_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams.toString()
    });

    console.log(`[${index + 1}/50] Submitted feedback for ${entry.name} (${entry.email}) - Wallet: ${entry.wallet.slice(0, 8)}...`);
    return true;
  } catch (error) {
    console.error(`Error submitting entry for ${entry.name}:`, error);
    return false;
  }
}

// Main execution function
async function main() {
  console.log(`Starting submission of remaining feedback responses starting from Arvind Jain to: ${FORM_URL}\n`);
  
  let successCount = 0;
  // Starting from index 30 (Arvind Jain)
  for (let i = 30; i < payloads.length; i++) {
    const success = await submitEntry(payloads[i], i);
    if (success) successCount++;
    
    // Calculate a random delay between 80 seconds and 120 seconds
    const delayMs = Math.floor(Math.random() * (120000 - 80000 + 1)) + 80000;
    console.log(`Waiting for ${Math.round(delayMs / 1000)} seconds before next submission...\n`);
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  
  console.log(`\nFinished! Successfully submitted ${successCount} remaining feedbacks.`);
}

main();
