import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone, PhoneOff, PhoneIncoming, MessageSquare, Calendar, Star,
  CheckCircle, XCircle, Clock, Bot, ArrowRight, Play, RotateCcw,
  Smartphone, Bell, TrendingUp, DollarSign, Zap,
  ChevronRight, Building2, Wrench, Scale, Smile, Scissors, Home,
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════════════
   VERTICAL SCENARIOS — each vertical gets its own story
   ═══════════════════════════════════════════════════════════════════ */

interface VerticalScenario {
  id: string;
  label: string;
  icon: typeof Phone;
  businessName: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  jobValue: string;
  weeklyMissed: string;
  monthlyLost: string;
  withoutEvents: { icon: typeof Phone; label: string; time: string; color: string }[];
  chatMessages: { from: "customer" | "ai" | "system"; text: string }[];
  backendEvents: { icon: typeof Phone; label: string; time: string; color: string }[];
  reviewText: string;
  closingLine: string;
  pipelineLeads: { col: string; color: string; name: string; service: string; value: string; time: string; isNew?: boolean }[];
}

const verticals: VerticalScenario[] = [
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Wrench,
    businessName: "Johnson Plumbing",
    customerName: "Sarah Mitchell",
    customerPhone: "(816) 555-0142",
    serviceType: "Emergency Plumbing",
    jobValue: "$1,200",
    weeklyMissed: "5-8",
    monthlyLost: "$6,000-$12,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Sarah calls about a leaking pipe", time: "6:47 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "No answer — goes to voicemail", time: "6:47 PM", color: "text-red-500" },
      { icon: Clock, label: "Sarah waits 10 minutes...", time: "6:57 PM", color: "text-yellow-500" },
      { icon: Phone, label: "Sarah calls your competitor instead", time: "7:02 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $1,200 emergency plumbing job", time: "7:15 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (816) 555-0142..." },
      { from: "ai", text: "Thank you for calling Johnson Plumbing! This is our AI assistant. How can I help you today?" },
      { from: "customer", text: "Hi, I have a pipe that's leaking pretty badly under my kitchen sink. Can someone come out tonight?" },
      { from: "ai", text: "I'm sorry to hear about the leak! We have emergency service available this evening. Can I get your name and address to schedule a technician?" },
      { from: "customer", text: "Sarah Mitchell, 4521 Oak Street." },
      { from: "ai", text: "Got it, Sarah! I've booked a technician to come out tonight between 7:30-8:00 PM. You'll receive a text confirmation. Is there anything else I can help with?" },
      { from: "customer", text: "No, that's perfect. Thank you!" },
      { from: "ai", text: "You're welcome, Sarah! Our technician Mike will be there shortly. Have a great evening!" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Sarah calls about a leaking pipe", time: "6:47 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers instantly — qualifies the lead", time: "6:47 PM", color: "text-green-500" },
      { icon: Calendar, label: "Emergency visit booked for 7:30 PM", time: "6:48 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Auto-text sent to Sarah with confirmation", time: "6:48 PM", color: "text-green-500" },
      { icon: Bell, label: "You get a notification with full details", time: "6:48 PM", color: "text-orange-500" },
      { icon: Smartphone, label: "Technician Mike gets dispatched", time: "6:49 PM", color: "text-green-500" },
      { icon: Star, label: "After job: auto review request sent to Sarah", time: "9:15 PM", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $1,200 emergency plumbing job", time: "9:30 PM", color: "text-green-600" },
    ],
    reviewText: "Mike came out within an hour and fixed the leak right away. Super professional and friendly. Will definitely call again!",
    closingLine: "every day without this system, you're losing calls like Sarah's",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Sarah Mitchell", service: "Emergency Plumbing", value: "$1,200", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Tom Henderson", service: "Water Heater Install", value: "$2,800", time: "2h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Mike Rodriguez", service: "Pipe Repair", value: "$650", time: "Today 2pm" },
      { col: "Job Complete", color: "bg-purple-500", name: "Dave Johnson", service: "Pipe Replacement", value: "$3,200", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Lisa Park", service: "Faucet Install", value: "$450", time: "2 days ago" },
    ],
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: Home,
    businessName: "Comfort Air Heating & Cooling",
    customerName: "James Walker",
    customerPhone: "(972) 555-0287",
    serviceType: "AC Repair",
    jobValue: "$850",
    weeklyMissed: "6-10",
    monthlyLost: "$8,000-$15,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "James calls — his AC died in 100° heat", time: "7:12 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "No answer — goes to voicemail", time: "7:12 PM", color: "text-red-500" },
      { icon: Clock, label: "James sweating, waiting 15 minutes...", time: "7:27 PM", color: "text-yellow-500" },
      { icon: Phone, label: "James calls the next HVAC company on Google", time: "7:30 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $850 emergency AC repair + future maintenance", time: "7:45 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (972) 555-0287..." },
      { from: "ai", text: "Thank you for calling Comfort Air Heating & Cooling! How can I help you today?" },
      { from: "customer", text: "My AC just stopped working and it's over 100 degrees out. I need someone ASAP." },
      { from: "ai", text: "I'm sorry about that, especially in this heat! We treat no-AC calls as emergencies. Can I get your name and address? I'll get a technician out to you as soon as possible." },
      { from: "customer", text: "James Walker, 8732 Elm Drive, Dallas." },
      { from: "ai", text: "Thank you, James! I've scheduled an emergency visit for tonight between 8:00-8:30 PM. Our tech Chris will text you when he's on his way. Hang tight!" },
      { from: "customer", text: "That's amazing, thank you so much." },
      { from: "ai", text: "You're welcome! Stay cool — help is on the way!" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "James calls — AC emergency in 100° heat", time: "7:12 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers instantly — flags as emergency", time: "7:12 PM", color: "text-green-500" },
      { icon: Calendar, label: "Emergency visit booked for 8:00 PM", time: "7:13 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Auto-text sent to James with ETA", time: "7:13 PM", color: "text-green-500" },
      { icon: Bell, label: "Owner notified — emergency dispatch", time: "7:13 PM", color: "text-orange-500" },
      { icon: Smartphone, label: "Tech Chris dispatched with job details", time: "7:14 PM", color: "text-green-500" },
      { icon: Star, label: "After fix: auto review request sent", time: "10:00 PM", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $850 AC repair + maintenance plan", time: "10:30 PM", color: "text-green-600" },
    ],
    reviewText: "Chris got here fast and had my AC running in under an hour. In this heat, that's a lifesaver. Already signed up for their maintenance plan. Highly recommend!",
    closingLine: "in the summer, every missed HVAC call is $500-$2,000 walking to your competitor",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "James Walker", service: "Emergency AC Repair", value: "$850", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Linda Garcia", service: "Furnace Tune-Up", value: "$350", time: "3h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Robert Kim", service: "AC Install", value: "$4,200", time: "Tomorrow 9am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Nancy Lee", service: "Duct Cleaning", value: "$600", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Steve Adams", service: "Heat Pump Repair", value: "$1,100", time: "2 days ago" },
    ],
  },
  {
    id: "legal",
    label: "Legal",
    icon: Scale,
    businessName: "Martinez Family Law",
    customerName: "Amanda Torres",
    customerPhone: "(713) 555-0319",
    serviceType: "Family Law Consultation",
    jobValue: "$3,500",
    weeklyMissed: "4-6",
    monthlyLost: "$10,000-$20,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Amanda calls about a custody matter", time: "5:32 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Office closed — voicemail message plays", time: "5:32 PM", color: "text-red-500" },
      { icon: Clock, label: "Amanda is stressed, needs help NOW...", time: "5:40 PM", color: "text-yellow-500" },
      { icon: Phone, label: "Amanda calls another attorney who answers", time: "5:45 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $3,500+ custody case retainer", time: "6:00 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (713) 555-0319..." },
      { from: "ai", text: "Thank you for calling Martinez Family Law. I understand legal matters can be stressful. How can I help you today?" },
      { from: "customer", text: "I need to talk to someone about a custody situation. My ex just filed something and I don't know what to do." },
      { from: "ai", text: "I'm sorry you're dealing with this. We handle custody cases regularly and can absolutely help. Let me get some basic info so we can schedule a consultation. What's your name?" },
      { from: "customer", text: "Amanda Torres." },
      { from: "ai", text: "Thank you, Amanda. I have a consultation opening tomorrow at 10 AM with Attorney Martinez. It's a 30-minute initial consultation. Would that work for you?" },
      { from: "customer", text: "Yes, that would be great. I really need to talk to someone." },
      { from: "ai", text: "You're booked for tomorrow at 10 AM. You'll receive a confirmation text with our office address and what documents to bring. You're in good hands, Amanda." },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Amanda calls about custody case", time: "5:32 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — empathetic, professional tone", time: "5:32 PM", color: "text-green-500" },
      { icon: Calendar, label: "Consultation booked for tomorrow 10 AM", time: "5:33 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation text with prep checklist sent", time: "5:33 PM", color: "text-green-500" },
      { icon: Bell, label: "Attorney notified with case summary", time: "5:33 PM", color: "text-orange-500" },
      { icon: Star, label: "After consultation: review request sent", time: "11:00 AM", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $3,500 retainer + ongoing case", time: "11:30 AM", color: "text-green-600" },
    ],
    reviewText: "I was panicking about my custody case and they got back to me right away. Attorney Martinez was compassionate and really knew her stuff. I felt so much better after our meeting.",
    closingLine: "in family law, when someone calls, they need help NOW — if you don't answer, they call the next attorney",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Amanda Torres", service: "Custody Case", value: "$3,500", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "David Chen", service: "Divorce Filing", value: "$5,000", time: "4h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Maria Santos", service: "Child Support", value: "$2,500", time: "Tomorrow 2pm" },
      { col: "Job Complete", color: "bg-purple-500", name: "Kevin Wright", service: "Mediation", value: "$1,800", time: "Last week" },
      { col: "Review Sent", color: "bg-green-500", name: "Lisa Monroe", service: "Prenup", value: "$2,200", time: "3 days ago" },
    ],
  },
  {
    id: "dental",
    label: "Dental",
    icon: Smile,
    businessName: "Bright Smile Dental",
    customerName: "Ryan Cooper",
    customerPhone: "(469) 555-0198",
    serviceType: "Emergency Dental",
    jobValue: "$600",
    weeklyMissed: "8-12",
    monthlyLost: "$5,000-$10,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Ryan calls with severe tooth pain", time: "8:15 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "After hours — voicemail picks up", time: "8:15 PM", color: "text-red-500" },
      { icon: Clock, label: "Ryan in pain, searches for emergency dentist...", time: "8:20 PM", color: "text-yellow-500" },
      { icon: Phone, label: "Ryan finds another dentist who answers", time: "8:25 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $600 emergency visit + new patient lifetime value", time: "8:30 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (469) 555-0198..." },
      { from: "ai", text: "Thank you for calling Bright Smile Dental! How can I help you?" },
      { from: "customer", text: "I have really bad tooth pain, it's been getting worse all day. Do you have any openings?" },
      { from: "ai", text: "I'm sorry about the pain! We reserve emergency slots each day for situations like this. I can get you in first thing tomorrow morning at 8 AM. What's your name?" },
      { from: "customer", text: "Ryan Cooper. Is there anything I can do tonight for the pain?" },
      { from: "ai", text: "Ibuprofen and a cold compress can help, Ryan. Avoid hot or cold foods on that side. I've booked you for 8 AM tomorrow with Dr. Patel. You'll get a text with our address and new patient forms to fill out in advance." },
      { from: "customer", text: "Thank you, I really appreciate it." },
      { from: "ai", text: "Hang in there, Ryan! Dr. Patel will take great care of you in the morning." },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Ryan calls with severe tooth pain", time: "8:15 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — reassures and books", time: "8:15 PM", color: "text-green-500" },
      { icon: Calendar, label: "Emergency slot booked for 8 AM", time: "8:16 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "New patient forms texted automatically", time: "8:16 PM", color: "text-green-500" },
      { icon: Bell, label: "Front desk notified of emergency add-on", time: "8:16 PM", color: "text-orange-500" },
      { icon: Star, label: "After visit: review request sent", time: "10:00 AM", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $600 + new patient LTV ~$3,000", time: "10:30 AM", color: "text-green-600" },
    ],
    reviewText: "I called after hours with terrible tooth pain and they actually answered and got me in first thing. Dr. Patel was amazing. So glad I found this place — I'm switching to them permanently.",
    closingLine: "dental patients in pain call 2-3 places — whoever answers first wins that patient for life",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Ryan Cooper", service: "Emergency Dental", value: "$600", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Emily Ross", service: "Teeth Whitening", value: "$450", time: "1h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Jason Park", service: "Crown Fitting", value: "$1,200", time: "Tomorrow 11am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Maria Gomez", service: "Root Canal", value: "$1,800", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Sam Taylor", service: "Cleaning", value: "$200", time: "2 days ago" },
    ],
  },
  {
    id: "salon",
    label: "Salon & Spa",
    icon: Scissors,
    businessName: "Luxe Beauty Studio",
    customerName: "Nicole Adams",
    customerPhone: "(404) 555-0234",
    serviceType: "Color & Cut",
    jobValue: "$250",
    weeklyMissed: "10-15",
    monthlyLost: "$4,000-$8,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Nicole calls to book a color appointment", time: "2:30 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Stylist is with a client — can't answer", time: "2:30 PM", color: "text-red-500" },
      { icon: Clock, label: "Nicole tries again 30 min later... no answer", time: "3:00 PM", color: "text-yellow-500" },
      { icon: Phone, label: "Nicole books with another salon online", time: "3:10 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $250 appointment + recurring client", time: "3:15 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (404) 555-0234..." },
      { from: "ai", text: "Thank you for calling Luxe Beauty Studio! How can I help you today?" },
      { from: "customer", text: "Hi! I'm looking to get a balayage and a trim. Do you have anything this week?" },
      { from: "ai", text: "We'd love to have you in! Let me check availability. We have openings Thursday at 2 PM and Friday at 10 AM with Jessica, our color specialist. Which works better?" },
      { from: "customer", text: "Thursday at 2 works great! My name is Nicole Adams." },
      { from: "ai", text: "Perfect, Nicole! You're booked with Jessica on Thursday at 2 PM for a balayage and trim. Plan for about 2.5 hours. You'll get a text confirmation with our address. See you Thursday!" },
      { from: "customer", text: "Awesome, can't wait!" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Nicole calls to book color appointment", time: "2:30 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — checks availability in real-time", time: "2:30 PM", color: "text-green-500" },
      { icon: Calendar, label: "Thursday 2 PM booked with Jessica", time: "2:31 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation text + salon address sent", time: "2:31 PM", color: "text-green-500" },
      { icon: Bell, label: "Jessica notified of new booking", time: "2:31 PM", color: "text-orange-500" },
      { icon: Star, label: "After appointment: review request sent", time: "5:00 PM", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $250 + new recurring client", time: "5:30 PM", color: "text-green-600" },
    ],
    reviewText: "Jessica did an amazing balayage — exactly what I wanted! The booking was so easy and they sent me a reminder. Found my new go-to salon!",
    closingLine: "stylists can't answer the phone while they're doing hair — that's half your calls going to voicemail",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Nicole Adams", service: "Balayage & Trim", value: "$250", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Tasha Williams", service: "Extensions", value: "$400", time: "2h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Kayla Brown", service: "Highlights", value: "$180", time: "Tomorrow 10am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Jen Martinez", service: "Keratin Treatment", value: "$350", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Alicia Chen", service: "Cut & Style", value: "$85", time: "3 days ago" },
    ],
  },
  {
    id: "realestate",
    label: "Real Estate",
    icon: Building2,
    businessName: "Horizon Realty Group",
    customerName: "Marcus & Tina Johnson",
    customerPhone: "(512) 555-0176",
    serviceType: "Home Buying",
    jobValue: "$9,000",
    weeklyMissed: "3-5",
    monthlyLost: "$15,000-$30,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Marcus calls about a listing he saw online", time: "8:45 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Agent's phone goes to voicemail", time: "8:45 PM", color: "text-red-500" },
      { icon: Clock, label: "Marcus wants to see the house this weekend...", time: "8:50 PM", color: "text-yellow-500" },
      { icon: Phone, label: "Marcus contacts the listing agent directly", time: "9:00 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: $9,000 buyer's agent commission", time: "9:15 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from (512) 555-0176..." },
      { from: "ai", text: "Thank you for calling Horizon Realty Group! Are you looking to buy, sell, or have a question about a property?" },
      { from: "customer", text: "We saw a listing on 245 Maple Drive and want to schedule a showing this weekend." },
      { from: "ai", text: "Great choice — that's a beautiful property! I can get you set up. Can I get your names and the best way to reach you?" },
      { from: "customer", text: "Marcus and Tina Johnson, you can reach us at this number." },
      { from: "ai", text: "Perfect! I've noted your interest in 245 Maple Drive. Our agent Sarah will reach out first thing tomorrow to schedule your showing this weekend. Are you pre-approved for financing, or would you like info on that as well?" },
      { from: "customer", text: "We're pre-approved. Just want to see the house." },
      { from: "ai", text: "Wonderful! Sarah will confirm the showing time tomorrow. You'll get a text with the property details and her contact info. Exciting times ahead!" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Marcus calls about 245 Maple Drive listing", time: "8:45 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — qualifies as pre-approved buyer", time: "8:45 PM", color: "text-green-500" },
      { icon: Calendar, label: "Showing request logged for this weekend", time: "8:46 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Property details texted to Marcus", time: "8:46 PM", color: "text-green-500" },
      { icon: Bell, label: "Agent Sarah notified with buyer details", time: "8:46 PM", color: "text-orange-500" },
      { icon: Star, label: "After closing: review request sent", time: "30 days", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $9,000 commission + referrals", time: "30 days", color: "text-green-600" },
    ],
    reviewText: "Sarah was incredible from start to finish. They responded to us immediately even though we called late. Found our dream home in 3 weeks. Couldn't recommend Horizon more!",
    closingLine: "buyers move fast — if you don't answer, the listing agent gets that commission instead of you",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Marcus Johnson", service: "Buyer - 245 Maple Dr", value: "$9,000", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Anna Williams", service: "Seller - Home Eval", value: "$12,000", time: "5h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Derek Nguyen", service: "Buyer - Showing", value: "$7,500", time: "Saturday 11am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Sandra Lopez", service: "Closed - 89 Pine St", value: "$11,000", time: "Last week" },
      { col: "Review Sent", color: "bg-green-500", name: "Tim Brooks", service: "Closed - 412 Oak Ave", value: "$8,500", time: "2 weeks ago" },
    ],
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: Building2,
    businessName: "Luigi's Italian Kitchen",
    customerName: "Jennifer Park",
    customerPhone: "(512) 555-0183",
    serviceType: "Private Event Booking",
    jobValue: "$2,400",
    weeklyMissed: "8-12",
    monthlyLost: "$6,000-$10,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Jennifer calls about private dining for 30", time: "7:15 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Kitchen slammed — no one picks up", time: "7:15 PM", color: "text-red-500" },
      { icon: Clock, label: "Jennifer waits 20 minutes, calls back", time: "7:35 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Still no answer — dinner rush ongoing", time: "7:35 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Jennifer books another restaurant", time: "7:40 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Jennifer Park — forwarded to AI" },
      { from: "customer", text: "Hi! I'm looking to book a private dining event for about 30 people next month." },
      { from: "ai", text: "How wonderful! I'd love to help you plan that. Luigi's has a beautiful private dining room that seats up to 40 guests. What date were you thinking?" },
      { from: "customer", text: "We're flexible — maybe the second or third Saturday of next month?" },
      { from: "ai", text: "Both dates are available. We offer a set menu for private events starting at $75 per person, which includes appetizers, entrée, and dessert. Shall I hold the room?" },
      { from: "customer", text: "Yes, let's do the third Saturday. That's perfect!" },
      { from: "ai", text: "Excellent! I've reserved the private dining room for 30 guests. You'll receive a confirmation text with the deposit details and menu options shortly." },
      { from: "system", text: "Event booked — manager notified — confirmation texted to Jennifer" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Jennifer calls about private event for 30", time: "7:15 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — captures event details & date", time: "7:15 PM", color: "text-green-500" },
      { icon: Calendar, label: "Private dining room reserved for the 3rd Saturday", time: "7:16 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation + deposit info texted to Jennifer", time: "7:16 PM", color: "text-green-500" },
      { icon: Bell, label: "Manager notified with full event details", time: "7:16 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-event review request sent automatically", time: "Event day", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $2,400 private event booking", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "Booked our company dinner here and they were SO responsive from the first call. Amazing food and service!",
    closingLine: "during dinner rush you can't answer the phone — but that's exactly when event bookings walk out the door",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Jennifer Park", service: "Private Event - 30 Guests", value: "$2,400", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Carlos Vega", service: "Birthday Dinner - 12 Guests", value: "$900", time: "3h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Megan Liu", service: "Corporate Lunch - 20 Guests", value: "$1,600", time: "Next Friday" },
      { col: "Job Complete", color: "bg-purple-500", name: "Steve Hammond", service: "Anniversary Dinner", value: "$450", time: "Last Saturday" },
      { col: "Review Sent", color: "bg-green-500", name: "Priya Nair", service: "Bridal Shower - 25 Guests", value: "$2,000", time: "2 weeks ago" },
    ],
  },
  {
    id: "auto",
    label: "Auto Services",
    icon: Wrench,
    businessName: "Premier Auto Care",
    customerName: "Brian Walsh",
    customerPhone: "(512) 555-0247",
    serviceType: "Diagnostic & Repair",
    jobValue: "$650",
    weeklyMissed: "6-10",
    monthlyLost: "$5,000-$8,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Brian calls about strange engine noise", time: "2:10 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Techs under cars — nobody answers", time: "2:10 PM", color: "text-red-500" },
      { icon: Clock, label: "Brian waits, calls back 15 minutes later", time: "2:25 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Still no answer — shop is overwhelmed", time: "2:25 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Brian drives to the chain shop down the street", time: "2:30 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Brian Walsh — forwarded to AI" },
      { from: "customer", text: "Hey, my car has been making a grinding noise when I brake. It started yesterday." },
      { from: "ai", text: "That definitely sounds like something we should look at right away. Is the noise happening at all speeds or mainly when slowing down?" },
      { from: "customer", text: "Mostly when I slow down, especially at lower speeds. Kind of a metal-on-metal sound." },
      { from: "ai", text: "That could be worn brake pads or rotors — very important to get checked soon. Can I schedule a diagnostic appointment for you? We have openings tomorrow morning." },
      { from: "customer", text: "Yes, tomorrow morning works great. What time?" },
      { from: "ai", text: "I've got you in for 9 AM tomorrow. You'll get a text with the address and a reminder tonight. Our service advisor will call if we find anything before starting work." },
      { from: "system", text: "Appointment booked — service advisor notified — confirmation texted to Brian" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Brian calls about grinding brake noise", time: "2:10 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — captures symptoms & urgency", time: "2:10 PM", color: "text-green-500" },
      { icon: Calendar, label: "Diagnostic appointment booked for 9 AM tomorrow", time: "2:11 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Shop address & appointment reminder texted to Brian", time: "2:11 PM", color: "text-green-500" },
      { icon: Bell, label: "Service advisor notified with symptom details", time: "2:11 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-repair review request sent automatically", time: "Job complete", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $650 repair + recurring maintenance customer", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "They got me in same day when I called about a weird engine noise. Fast, honest, and fair pricing. My new go-to shop.",
    closingLine: "techs can't leave a car on the lift to answer the phone — but every missed call is a customer lost to the shop down the street",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Brian Walsh", service: "Brake Diagnostic", value: "$650", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Janet Moore", service: "Oil Change + Inspection", value: "$120", time: "1h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Kevin Osei", service: "Transmission Service", value: "$480", time: "Tomorrow 9am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Laura Kim", service: "AC Recharge", value: "$220", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Rob Tanner", service: "Full Brake Job", value: "$780", time: "Last week" },
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Home,
    businessName: "Iron Peak Fitness",
    customerName: "Alicia Torres",
    customerPhone: "(512) 555-0319",
    serviceType: "Membership Sign-Up",
    jobValue: "$600",
    weeklyMissed: "5-8",
    monthlyLost: "$4,000-$7,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Alicia calls about membership after Instagram ad", time: "9:05 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Gym closed for the night — no answer", time: "9:05 PM", color: "text-red-500" },
      { icon: Clock, label: "Alicia leaves a voicemail, but motivation fades", time: "9:06 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "No callback — front desk opens at 7 AM", time: "Next day", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Alicia joins Planet Fitness online instead", time: "9:20 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Alicia Torres — forwarded to AI" },
      { from: "customer", text: "Hi! I saw your Instagram ad and I'm interested in joining. What are your membership options?" },
      { from: "ai", text: "Great timing — we have a special going right now! Iron Peak offers month-to-month at $59/mo or an annual membership at $49/mo. Both include all classes and equipment." },
      { from: "customer", text: "Oh that's not bad. Is there a way to try it before committing?" },
      { from: "ai", text: "Absolutely! We offer a free trial day — I can book you in for tomorrow. You'd get full access to everything including a free intro session with one of our trainers." },
      { from: "customer", text: "That sounds perfect. Can you book me for tomorrow evening?" },
      { from: "ai", text: "Done! You're set for tomorrow at 6 PM. I'll send you the gym address, what to bring, and a reminder an hour before. We can't wait to meet you!" },
      { from: "system", text: "Free trial booked — staff notified — confirmation texted to Alicia" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Alicia calls about membership at 9 PM", time: "9:05 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — describes membership options", time: "9:05 PM", color: "text-green-500" },
      { icon: Calendar, label: "Free trial visit booked for tomorrow at 6 PM", time: "9:06 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Gym address, what to bring & reminder texted to Alicia", time: "9:06 PM", color: "text-green-500" },
      { icon: Bell, label: "Front desk notified of trial booking", time: "9:06 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-trial membership offer sent automatically", time: "Next day", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $600/year membership + referrals", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "Called at night expecting voicemail and actually got through! Signed up after my trial. Best gym decision ever.",
    closingLine: "fitness motivation peaks at night — if you don't answer when they're inspired, they sign up with a competitor by morning",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Alicia Torres", service: "Annual Membership", value: "$600", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Marcus Bell", service: "Month-to-Month", value: "$59/mo", time: "2h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Sophie Grant", service: "Free Trial Visit", value: "$600", time: "Tomorrow 6pm" },
      { col: "Job Complete", color: "bg-purple-500", name: "James Yoo", service: "Annual Membership", value: "$600", time: "Last week" },
      { col: "Review Sent", color: "bg-green-500", name: "Tasha Coleman", service: "Personal Training Bundle", value: "$1,200", time: "10 days ago" },
    ],
  },
  {
    id: "pest",
    label: "Pest Control",
    icon: Wrench,
    businessName: "Guardian Pest Solutions",
    customerName: "Tom Rivera",
    customerPhone: "(512) 555-0428",
    serviceType: "Termite Treatment",
    jobValue: "$1,200",
    weeklyMissed: "6-10",
    monthlyLost: "$7,000-$12,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Tom calls about termites in his garage", time: "7:00 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Office closed — call goes to voicemail", time: "7:00 PM", color: "text-red-500" },
      { icon: Clock, label: "Tom panics and Googles other pest companies", time: "7:05 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Guardian never returns the call in time", time: "7:30 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Tom books a competitor that answered", time: "7:35 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Tom Rivera — forwarded to AI" },
      { from: "customer", text: "I just found what looks like termites in my garage. There's a bunch of them near the door frame. I'm freaking out a little." },
      { from: "ai", text: "I completely understand — termites can feel really alarming. The good news is you caught it. Can you tell me if you're seeing small white insects or small brown winged ones?" },
      { from: "customer", text: "Small white ones, lots of them, near wood. The door frame looks damaged." },
      { from: "ai", text: "That sounds like active subterranean termites. This is urgent and we treat it as such. I can schedule an emergency inspection for first thing tomorrow morning. Does 8 AM work?" },
      { from: "customer", text: "Yes, 8 AM is perfect. Thank you so much." },
      { from: "ai", text: "You're all set for 8 AM tomorrow. I'm texting you a confirmation now and our lead technician has been notified. Don't disturb the area — we'll take it from there." },
      { from: "system", text: "Emergency inspection booked — lead tech notified — confirmation texted to Tom" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Tom calls about termites at 7 PM", time: "7:00 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — identifies urgency, captures details", time: "7:00 PM", color: "text-green-500" },
      { icon: Calendar, label: "Emergency inspection scheduled for 8 AM tomorrow", time: "7:01 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation texted to Tom with prep instructions", time: "7:01 PM", color: "text-green-500" },
      { icon: Bell, label: "Lead technician notified immediately", time: "7:01 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-treatment review request sent automatically", time: "Job complete", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $1,200 treatment + quarterly plan", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "Found termites and freaked out. They answered right away and had someone out the next morning. Saved my garage. Now on their quarterly plan.",
    closingLine: "pest emergencies happen at night and on weekends — if you're not answering, the customer is already calling your competitor",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Tom Rivera", service: "Termite Treatment", value: "$1,200", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Linda Marsh", service: "Rodent Control", value: "$350", time: "4h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Gary Simmons", service: "Bed Bug Treatment", value: "$800", time: "Tomorrow 8am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Diane Foster", service: "Quarterly Plan - Ants", value: "$480/yr", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Paul Nguyen", service: "Termite Inspection", value: "$1,500", time: "Last week" },
    ],
  },
  {
    id: "roofing",
    label: "Roofing",
    icon: Building2,
    businessName: "Summit Roofing & Exteriors",
    customerName: "Karen Mitchell",
    customerPhone: "(512) 555-0561",
    serviceType: "Full Roof Replacement",
    jobValue: "$14,000",
    weeklyMissed: "10-15",
    monthlyLost: "$15,000-$30,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Karen calls after hailstorm damages her roof", time: "4:30 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Office swamped with calls — goes to voicemail", time: "4:30 PM", color: "text-red-500" },
      { icon: Clock, label: "Karen calls two more roofers in her area", time: "4:45 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Summit never calls back — storm surge overloads staff", time: "5:00 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Karen books the roofer that answered first", time: "5:10 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Karen Mitchell — forwarded to AI" },
      { from: "customer", text: "Hi, we had a bad hailstorm last night and my roof has visible damage. There are shingles in my yard." },
      { from: "ai", text: "I'm sorry to hear that — hail damage can be serious. We can get an estimator out to assess the damage and work directly with your insurance if needed. What's your address?" },
      { from: "customer", text: "It's 4821 Ridgeline Blvd. There's definitely damage on the south-facing slope." },
      { from: "ai", text: "Got it. I can schedule a free inspection for the day after tomorrow. We'll document everything for your insurance claim and give you a full estimate at no cost." },
      { from: "customer", text: "That's great. Yes, please book it." },
      { from: "ai", text: "You're all set. Our estimator will be there in two days between 10 AM and noon. I'm texting you a confirmation now and your estimator has been notified." },
      { from: "system", text: "Inspection scheduled — estimator notified immediately — confirmation texted to Karen" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Karen calls about hail damage to roof", time: "4:30 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — captures address & damage details", time: "4:30 PM", color: "text-green-500" },
      { icon: Calendar, label: "Free inspection scheduled for 2 days out", time: "4:31 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation + estimator info texted to Karen", time: "4:31 PM", color: "text-green-500" },
      { icon: Bell, label: "Estimator notified immediately with property details", time: "4:31 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-project review request sent automatically", time: "Job complete", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $14,000 full roof replacement", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "After the hailstorm everyone was booked. Summit actually answered my call and got an inspector out in 2 days. Professional from start to finish.",
    closingLine: "after every storm the phone rings off the hook — the roofer that answers first gets the job",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Karen Mitchell", service: "Full Roof Replacement", value: "$14,000", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Dale Ferguson", service: "Hail Damage Inspection", value: "$11,000", time: "30m ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Brenda Ortiz", service: "Roof Repair", value: "$3,200", time: "Tomorrow 9am" },
      { col: "Job Complete", color: "bg-purple-500", name: "Victor Huang", service: "Full Replacement", value: "$16,500", time: "Last week" },
      { col: "Review Sent", color: "bg-green-500", name: "Cynthia Bell", service: "Gutter Replacement", value: "$2,800", time: "2 weeks ago" },
    ],
  },
  {
    id: "cleaning",
    label: "Cleaning",
    icon: Home,
    businessName: "Sparkle Clean Pro",
    customerName: "Diana Chen",
    customerPhone: "(512) 555-0672",
    serviceType: "Move-Out Deep Clean",
    jobValue: "$350",
    weeklyMissed: "8-12",
    monthlyLost: "$3,000-$5,000",
    withoutEvents: [
      { icon: MessageSquare, label: "Diana texts asking for a move-out clean quote", time: "9:05 PM", color: "text-blue-500" },
      { icon: PhoneOff, label: "No response — staff offline for the night", time: "9:05 PM", color: "text-red-500" },
      { icon: Clock, label: "Diana checks two other cleaning services online", time: "9:20 PM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Sparkle Clean responds at 9 AM — too late", time: "Next day", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Diana already booked another cleaner", time: "Next day", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming text from Diana Chen — AI responding instantly" },
      { from: "customer", text: "Hi! I need a move-out deep clean for my apartment. It's about 900 sq ft. I have to be out by Friday." },
      { from: "ai", text: "Hi Diana! We can definitely help with that. For a 900 sq ft move-out deep clean, our standard rate is $350. That includes appliances, bathrooms, and all floors. Does that work for you?" },
      { from: "customer", text: "Yes that's within my budget! Can you do Thursday?" },
      { from: "ai", text: "Thursday works great — we have a team available in the morning. I can book you for 9 AM. Will there be any large furniture left or is it empty?" },
      { from: "customer", text: "It'll be empty by then. Perfect, let's do 9 AM Thursday." },
      { from: "ai", text: "Booked! You'll get a confirmation text in a moment with our checklist of what's included and a reminder the day before. See you Thursday!" },
      { from: "system", text: "Booking confirmed — team scheduled — confirmation + checklist texted to Diana" },
    ],
    backendEvents: [
      { icon: MessageSquare, label: "Diana texts about move-out clean at 9 PM", time: "9:05 PM", color: "text-blue-500" },
      { icon: Bot, label: "AI responds instantly — quotes $350 for 900 sq ft", time: "9:05 PM", color: "text-green-500" },
      { icon: Calendar, label: "Thursday 9 AM cleaning appointment booked", time: "9:06 PM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation + cleaning checklist texted to Diana", time: "9:06 PM", color: "text-green-500" },
      { icon: Bell, label: "Team lead notified with job details", time: "9:06 PM", color: "text-orange-500" },
      { icon: Star, label: "Post-clean review request sent automatically", time: "Job complete", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $350 deep clean + potential recurring client", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "Texted them late and got an instant response. They came Thursday and the apartment was spotless. Landlord gave me my full deposit back!",
    closingLine: "cleaning customers text late at night when they realize they need help — if you're not responding instantly, someone else is",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Diana Chen", service: "Move-Out Deep Clean", value: "$350", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Nathan Price", service: "Post-Construction Clean", value: "$550", time: "1h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Olivia Reyes", service: "Recurring Biweekly", value: "$180/mo", time: "Next Tuesday" },
      { col: "Job Complete", color: "bg-purple-500", name: "Hannah Scott", service: "Deep Clean - 3BR", value: "$420", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Jason Wu", service: "Move-In Clean", value: "$300", time: "Last week" },
    ],
  },
  {
    id: "pet",
    label: "Pet Services",
    icon: Smile,
    businessName: "Happy Tails Pet Spa",
    customerName: "Rachel Kim",
    customerPhone: "(512) 555-0784",
    serviceType: "Holiday Boarding",
    jobValue: "$450",
    weeklyMissed: "6-10",
    monthlyLost: "$3,000-$6,000",
    withoutEvents: [
      { icon: PhoneIncoming, label: "Rachel calls about Thanksgiving week boarding", time: "11:30 AM", color: "text-blue-500" },
      { icon: PhoneOff, label: "Staff busy with dogs — no one answers", time: "11:30 AM", color: "text-red-500" },
      { icon: Clock, label: "Rachel leaves a voicemail, moves on to next option", time: "11:31 AM", color: "text-orange-500" },
      { icon: PhoneOff, label: "Happy Tails calls back hours later — slot already taken", time: "2:00 PM", color: "text-red-500" },
      { icon: DollarSign, label: "LOST: Rachel books another boarding facility", time: "12:00 PM", color: "text-red-600" },
    ],
    chatMessages: [
      { from: "system", text: "Incoming call from Rachel Kim — forwarded to AI" },
      { from: "customer", text: "Hi! I need to board my dog for Thanksgiving week. That's November 27th through December 3rd — 7 nights." },
      { from: "ai", text: "Hi Rachel! We'd love to have your pup stay with us for the holidays. We do have availability for those dates. What breed and size is your dog?" },
      { from: "customer", text: "She's a golden retriever, about 65 pounds. Super friendly." },
      { from: "ai", text: "Perfect — golden retrievers are always a hit here! Our large dog boarding is $65/night, so 7 nights would come to $455. Shall I go ahead and reserve her spot?" },
      { from: "customer", text: "Yes please! I've been so stressed about finding a spot." },
      { from: "ai", text: "All booked! I'm texting you a confirmation with drop-off instructions, what to bring, and a note about vaccination records we'll need. She's going to have a great time!" },
      { from: "system", text: "Boarding reservation confirmed — staff notified — confirmation + drop-off info texted to Rachel" },
    ],
    backendEvents: [
      { icon: PhoneIncoming, label: "Rachel calls about Thanksgiving boarding for golden retriever", time: "11:30 AM", color: "text-blue-500" },
      { icon: Bot, label: "AI answers — checks availability, captures pet details", time: "11:30 AM", color: "text-green-500" },
      { icon: Calendar, label: "7-night boarding reserved for Nov 27 – Dec 3", time: "11:31 AM", color: "text-green-500" },
      { icon: MessageSquare, label: "Confirmation + drop-off instructions texted to Rachel", time: "11:31 AM", color: "text-green-500" },
      { icon: Bell, label: "Staff notified with booking and pet details", time: "11:31 AM", color: "text-orange-500" },
      { icon: Star, label: "Post-stay review request sent automatically", time: "Dec 3", color: "text-yellow-500" },
      { icon: DollarSign, label: "CAPTURED: $450 boarding + regular grooming client", time: "Confirmed", color: "text-green-600" },
    ],
    reviewText: "I always stress about holiday boarding. They answered right away, booked everything, and sent me all the info I needed. My dog loved it there!",
    closingLine: "holiday boarding fills up fast — if you don't answer when they call, your competitor gets that spot and the ongoing grooming business too",
    pipelineLeads: [
      { col: "New Lead", color: "bg-blue-500", name: "Rachel Kim", service: "Thanksgiving Boarding - 7 nights", value: "$450", time: "Just now", isNew: true },
      { col: "New Lead", color: "bg-blue-500", name: "Tyler Brooks", service: "Grooming Appointment", value: "$85", time: "2h ago" },
      { col: "Appointment Set", color: "bg-orange-500", name: "Samantha Lee", service: "Weekend Boarding", value: "$130", time: "This Saturday" },
      { col: "Job Complete", color: "bg-purple-500", name: "David Park", service: "Full Groom + Bath", value: "$95", time: "Yesterday" },
      { col: "Review Sent", color: "bg-green-500", name: "Lisa Turner", service: "Christmas Boarding - 10 nights", value: "$650", time: "Last month" },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

type Phase = "intro" | "without" | "with-call" | "with-backend" | "crm" | "review" | "summary";
const phaseOrder: Phase[] = ["intro", "without", "with-call", "with-backend", "crm", "review", "summary"];
const phaseLabels = ["Intro", "Without AI", "AI Call", "Backend", "CRM", "Reviews", "Close"];

export default function LiveDemo() {
  const [selectedVertical, setSelectedVertical] = useState(0);
  const [phase, setPhase] = useState<Phase>("intro");
  const [animStep, setAnimStep] = useState(0);
  const [showNewLead, setShowNewLead] = useState(false);
  const [reviewStars, setReviewStars] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  // Counter to trigger animation effect when phase is set (even if same phase)
  const [phaseCounter, setPhaseCounter] = useState(0);

  const v = verticals[selectedVertical];
  const currentIndex = phaseOrder.indexOf(phase);
  const progress = (currentIndex / (phaseOrder.length - 1)) * 100;

  function clearTimers() {
    timerRef.current.forEach(clearTimeout);
    timerRef.current = [];
  }

  // Run animations whenever phase changes — this avoids the useEffect cleanup race condition
  useEffect(() => {
    clearTimers();
    setAnimStep(0);
    setShowNewLead(false);
    setReviewStars(0);

    const curV = verticals[selectedVertical];

    if (phase === "without") {
      for (let i = 1; i <= curV.withoutEvents.length; i++) {
        const t = setTimeout(() => setAnimStep(i), i * 1200);
        timerRef.current.push(t);
      }
    } else if (phase === "with-call") {
      for (let i = 1; i <= curV.chatMessages.length; i++) {
        const t = setTimeout(() => setAnimStep(i), i * 1500);
        timerRef.current.push(t);
      }
    } else if (phase === "with-backend") {
      for (let i = 1; i <= curV.backendEvents.length; i++) {
        const t = setTimeout(() => setAnimStep(i), i * 1400);
        timerRef.current.push(t);
      }
    } else if (phase === "crm") {
      const t = setTimeout(() => setShowNewLead(true), 1500);
      timerRef.current.push(t);
    } else if (phase === "review") {
      for (let i = 1; i <= 5; i++) {
        const t = setTimeout(() => setReviewStars(i), 800 + i * 400);
        timerRef.current.push(t);
      }
    }

    return () => clearTimers();
  }, [phase, phaseCounter, selectedVertical]);

  function goPhase(p: Phase) {
    setPhase(p);
    setPhaseCounter((c) => c + 1);
  }

  function nextPhase() {
    const nextIdx = currentIndex + 1;
    if (nextIdx < phaseOrder.length) {
      goPhase(phaseOrder[nextIdx]);
    }
  }

  function restart() {
    goPhase("intro");
  }

  function changeVertical(idx: number) {
    setSelectedVertical(idx);
    setPhase("intro");
    setPhaseCounter((c) => c + 1);
  }

  // Group pipeline leads by column
  const pipelineCols = ["New Lead", "Appointment Set", "Job Complete", "Review Sent"];
  const groupedLeads = pipelineCols.map((col) => ({
    name: col,
    color: v.pipelineLeads.find((l) => l.col === col)?.color || "bg-gray-500",
    leads: v.pipelineLeads.filter((l) => l.col === col),
  }));

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto space-y-5 pb-20 md:pb-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold tracking-tight" data-testid="text-demo-title">
            Live Demo Experience
          </h1>
          <Badge className="bg-red-500 text-white text-[10px] animate-pulse">LIVE</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Walk your prospect through this in real time. Show them exactly what happens with and without TotalFlow AI.
        </p>
      </div>

      {/* Vertical Selector */}
      <div>
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Select Their Industry
        </div>
        <div className="flex flex-wrap gap-2">
          {verticals.map((vert, i) => {
            const Icon = vert.icon;
            const isActive = i === selectedVertical;
            return (
              <button
                key={vert.id}
                onClick={() => changeVertical(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                data-testid={`vertical-${vert.id}`}
              >
                <Icon className="w-3 h-3" />
                {vert.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] text-muted-foreground">
          {phaseLabels.map((label, i) => (
            <button
              key={i}
              onClick={() => goPhase(phaseOrder[i])}
              className={`transition-colors ${i <= currentIndex ? "text-orange-500 font-medium" : "hover:text-foreground"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>

      {/* ═══ PHASE: INTRO ═══ */}
      {phase === "intro" && (
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent">
          <CardContent className="p-6 md:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto">
              <Play className="w-7 h-7 text-orange-500" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Ready to Show the Magic?</h2>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
                This demo shows what happens when a real customer calls {v.businessName} after hours — first without AI, then with TotalFlow.
              </p>
            </div>
            <Button onClick={() => goPhase("without")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2" data-testid="button-start-demo">
              <Play className="w-4 h-4" /> Start the Demo
            </Button>
            <div className="text-xs text-muted-foreground">
              Tip: Share your screen or hand them the phone. Takes ~3 minutes.
            </div>
          </CardContent>
        </Card>
      )}

      {/* ═══ PHASE: WITHOUT TOTALFLOW ═══ */}
      {phase === "without" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-base font-bold">Without TotalFlow AI</h2>
            <Badge variant="destructive" className="text-[10px]">Current Reality</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            "Let me show you what happens right now when someone calls {v.businessName} after hours..."
          </p>

          <Card>
            <CardContent className="p-4 md:p-5 space-y-3">
              {v.withoutEvents.map((event, i) => {
                const Icon = event.icon;
                const visible = i < animStep;
                const isLast = i === v.withoutEvents.length - 1;
                return (
                  <div
                    key={i}
                    style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
                    data-testid={`without-event-${i}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted`}>
                        <Icon className={`w-4 h-4 ${event.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm font-medium ${isLast ? "text-red-500 font-bold" : ""}`}>{event.label}</div>
                        <div className="text-[10px] text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {animStep >= v.withoutEvents.length && (
                <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="text-sm font-bold text-red-500 text-center">
                    This happens {v.weeklyMissed} times per week. That's {v.monthlyLost}/month walking out the door.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {animStep >= v.withoutEvents.length && (
            <div className="flex justify-end">
              <Button onClick={() => goPhase("with-call")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-show-with-ai">
                Now With TotalFlow <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══ PHASE: WITH TOTALFLOW — THE CALL ═══ */}
      {phase === "with-call" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-green-500" />
            <h2 className="text-base font-bold">With TotalFlow AI — The Call</h2>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[10px]">AI Answering</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            "Same scenario. {v.customerName} calls. But this time, TotalFlow AI picks up..."
          </p>

          <Card className="max-w-md mx-auto">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-t-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{v.businessName}</div>
                  <div className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    AI Answering
                  </div>
                </div>
              </div>

              <div className="p-3 md:p-4 space-y-3 min-h-[280px]">
                {v.chatMessages.map((msg, i) => {
                  if (i >= animStep) return null;

                  if (msg.from === "system") {
                    return (
                      <div key={i} className="text-center text-[10px] text-muted-foreground py-1">
                        {msg.text}
                      </div>
                    );
                  }

                  const isAI = msg.from === "ai";
                  return (
                    <div key={i} className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
                      <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        isAI
                          ? "bg-orange-500/10 border border-orange-500/20"
                          : "bg-blue-500/10 border border-blue-500/20"
                      }`}>
                        <div className="text-[10px] font-semibold mb-0.5 opacity-60">
                          {isAI ? "🤖 AI Assistant" : `👤 ${v.customerName.split(" ")[0]}`}
                        </div>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {animStep > 0 && animStep < v.chatMessages.length && (
                  <div className="flex items-center gap-1 text-muted-foreground pl-2">
                    <div className="flex gap-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-[10px] ml-1">typing...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {animStep >= v.chatMessages.length && (
            <div className="flex justify-center pt-2">
              <Button onClick={() => goPhase("with-backend")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-show-backend">
                See the Backend <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══ PHASE: BACKEND ═══ */}
      {phase === "with-backend" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            <h2 className="text-base font-bold">What Fires Off Automatically</h2>
            <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-[10px]">Automation</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            "While the AI was talking, here's everything that happened behind the scenes — zero effort from you..."
          </p>

          <Card>
            <CardContent className="p-4 md:p-5 space-y-3">
              {v.backendEvents.map((event, i) => {
                const Icon = event.icon;
                const visible = i < animStep;
                const isLast = i === v.backendEvents.length - 1;
                return (
                  <div
                    key={i}
                    style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.4s ease, transform 0.4s ease" }}
                    data-testid={`with-event-${i}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted">
                          <Icon className={`w-4 h-4 ${event.color}`} />
                        </div>
                        {i < v.backendEvents.length - 1 && (
                          <div className={`w-px h-5 ${visible ? "bg-border" : "bg-transparent"}`} style={{ transition: "background-color 0.4s ease" }} />
                        )}
                      </div>
                      <div className="flex-1 pb-1">
                        <div className={`text-sm font-medium ${isLast ? "text-green-500 font-bold" : ""}`}>{event.label}</div>
                        <div className="text-[10px] text-muted-foreground">{event.time}</div>
                      </div>
                      {visible && <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-1" />}
                    </div>
                  </div>
                );
              })}

              {animStep >= v.backendEvents.length && (
                <div className="mt-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="text-sm font-bold text-green-500 text-center">
                    Zero calls missed. Zero effort. {v.jobValue} captured automatically.
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {animStep >= v.backendEvents.length && (
            <div className="flex justify-center">
              <Button onClick={() => goPhase("crm")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-show-crm">
                See the CRM <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* ═══ PHASE: CRM ═══ */}
      {phase === "crm" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h2 className="text-base font-bold">Your CRM — Everything Tracked</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            "Every call, every lead, every job — tracked automatically. Here's what your dashboard looks like..."
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {groupedLeads.map((col, ci) => (
              <div key={ci} className="space-y-2">
                <div className="flex items-center gap-1.5 px-1">
                  <div className={`w-2 h-2 rounded-full ${col.color}`} />
                  <span className="text-[10px] md:text-xs font-semibold truncate">{col.name}</span>
                  <Badge variant="secondary" className="text-[9px] px-1 py-0 ml-auto">{col.leads.length}</Badge>
                </div>
                <div className="space-y-2">
                  {col.leads.map((lead, li) => (
                    <Card
                      key={li}
                      className={`transition-all duration-700 ${
                        lead.isNew && showNewLead ? "border-green-500/50 bg-green-500/5 ring-1 ring-green-500/30" : ""
                      }`}
                      data-testid={lead.isNew ? "card-new-lead" : `card-lead-${ci}-${li}`}
                    >
                      <CardContent className="p-2 md:p-3">
                        <div className="flex items-start justify-between">
                          <div className="text-[11px] md:text-xs font-medium truncate">{lead.name}</div>
                          {lead.isNew && showNewLead && (
                            <Badge className="bg-green-500 text-white text-[8px] px-1 py-0 animate-pulse">NEW</Badge>
                          )}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-0.5 truncate">{lead.service}</div>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-[11px] font-bold text-green-500">{lead.value}</span>
                          <span className="text-[9px] text-muted-foreground">{lead.time}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {showNewLead && (
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4">
                <div className="text-xs font-semibold text-orange-500 mb-1">SAY THIS</div>
                <div className="text-sm">
                  "See {v.customerName.split(" ")[0]}? They called 2 minutes ago. AI answered, booked the job, and they're already in your pipeline — no sticky notes, no forgotten follow-ups."
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center pt-2">
            <Button onClick={() => goPhase("review")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-show-reviews">
              See Reviews <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ═══ PHASE: REVIEWS ═══ */}
      {phase === "review" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-base font-bold">Automatic Review Collection</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            "After the job is done, here's what happens automatically..."
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-0">
                <div className="bg-green-600 text-white p-3 rounded-t-lg text-sm font-medium">
                  Text to {v.customerName}
                </div>
                <div className="p-3 md:p-4 space-y-3">
                  <div className="bg-green-500/10 rounded-xl px-3 py-2 text-sm max-w-[85%]">
                    Hi {v.customerName.split(" ")[0]}! Thanks for choosing {v.businessName}. We hope everything looks great! We'd love a quick review — it helps us help more people like you.
                  </div>
                  <div className="bg-green-500/10 rounded-xl px-3 py-2 text-sm max-w-[85%]">
                    <span className="text-blue-500 underline">https://g.page/r/{v.id}-review</span>
                  </div>
                  <div className="text-[10px] text-muted-foreground text-center">Sent automatically 2 hours after completion</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 md:p-5">
                <div className="text-center space-y-4">
                  <div className="text-sm font-semibold">{v.customerName.split(" ")[0]}'s Response</div>
                  <div className="flex justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-7 h-7 md:w-8 md:h-8 transition-all duration-300 ${
                          star <= reviewStars ? "text-yellow-500 fill-yellow-500" : "text-muted"
                        }`}
                        style={{ transform: star <= reviewStars ? "scale(1)" : "scale(0.75)" }}
                      />
                    ))}
                  </div>

                  {reviewStars >= 5 && (
                    <div className="space-y-3">
                      <div className="bg-muted/50 rounded-lg p-3 text-sm italic">
                        "{v.reviewText}"
                      </div>
                      <div className="flex items-center justify-center gap-1 text-green-500 text-xs font-semibold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Posted to Google automatically
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {reviewStars >= 5 && (
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4">
                <div className="text-xs font-semibold text-orange-500 mb-1">SAY THIS</div>
                <div className="text-sm">
                  "This all happened automatically. No remembering to ask, no texting, no follow-up. One of our clients went from 13 to 85 Google reviews in 90 days just from this."
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-center pt-2">
            <Button onClick={() => goPhase("summary")} className="bg-orange-500 hover:bg-orange-600 text-white gap-2 text-sm" data-testid="button-show-summary">
              Show the Numbers <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* ═══ PHASE: SUMMARY ═══ */}
      {phase === "summary" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h2 className="text-base font-bold">The Bottom Line</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4 text-center space-y-2">
                <XCircle className="w-7 h-7 text-red-500 mx-auto" />
                <div className="text-sm font-bold">Without AI</div>
                <div className="space-y-1.5 text-[11px] md:text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Missed/week</span><span className="font-medium text-red-500">{v.weeklyMissed}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Lost/month</span><span className="font-medium text-red-500">{v.monthlyLost}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span className="font-medium text-red-500">0</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">After-hours</span><span className="font-medium text-red-500">Voicemail</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20 bg-green-500/5">
              <CardContent className="p-4 text-center space-y-2">
                <CheckCircle className="w-7 h-7 text-green-500 mx-auto" />
                <div className="text-sm font-bold">With TotalFlow</div>
                <div className="space-y-1.5 text-[11px] md:text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Missed/week</span><span className="font-medium text-green-500">0</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Captured/mo</span><span className="font-medium text-green-500">+$5K-15K</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Reviews</span><span className="font-medium text-green-500">Auto</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">After-hours</span><span className="font-medium text-green-500">AI 24/7</span></div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent">
            <CardContent className="p-4 md:p-5 text-center space-y-3">
              <div className="text-sm font-bold">Your Investment</div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-orange-500">$497<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                  <div className="text-xs text-muted-foreground">+ $500 one-time setup</div>
                </div>
                <div className="text-muted-foreground text-xs">vs.</div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-green-500">$5K-$15K</div>
                  <div className="text-xs text-muted-foreground">additional revenue/month</div>
                </div>
              </div>
              <div className="text-sm font-medium">
                That's a <span className="text-orange-500 font-bold">10-29x return</span>. You need ONE extra job per month to cover the cost.
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-orange-500/5">
            <CardContent className="p-4">
              <div className="text-xs font-semibold text-orange-500 mb-2">CLOSE THE DEAL — SAY THIS</div>
              <div className="text-sm leading-relaxed space-y-2">
                <p>"So here's the situation: {v.closingLine}. That's real money going to your competitors."</p>
                <p>"We can have your system live in 48 hours. Setup is $500, then $497/month. No contract — cancel anytime."</p>
                <p className="font-bold">"Want to get started today, or would Monday work better?"</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-2">
            <Button onClick={restart} variant="outline" className="gap-2" data-testid="button-restart-demo">
              <RotateCcw className="w-4 h-4" /> Run Demo Again
            </Button>
          </div>
        </div>
      )}

      {/* Fixed bottom Next button for mobile */}
      {phase !== "intro" && phase !== "summary" && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={nextPhase}
            size="sm"
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg gap-1 text-xs rounded-full px-4"
            data-testid="button-next-phase"
          >
            Next <ChevronRight className="w-3 h-3" />
          </Button>
        </div>
      )}
    </div>
  );
}
