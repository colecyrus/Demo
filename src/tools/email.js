import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Draft Email on Subject",
	desc: "Draft an email based on tone, audience, and goals.",
	category: "Written Content",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/writing/email",
	api: "/ai/writing/email",

	output: {
		title: "Email",
		desc: "The following email has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Requirments",
		desc: "Better instructions = Better Emails",
		// n: 1,
		prompts: [
			{ 
				title: "Subject", 
				attr: "subject",  
				value: "", 
				placeholder: "The Subject", 
				label: "The subject you were planning to give the Email.",
				// type: "textarea",
				maxLength: 150,
				// max: 100,
				min: 5,
				required: true,
				error: "",
				example: "Investment Opportunity",
			},
			{ 
				title: "Audience", 
				attr: "audience",  
				value: "", 
				placeholder: "Lawyers, Unions, Small buisniess Owners", 
				label: "Who the main group are you are writing for",
				// type: "textarea",
				maxLength: 50,
				// max: 100,
				// min: 5,
				// required: true,
				error: "",
				example: "Unions",
			},
			{ 
				title: "Tone", 
				attr: "tone",  
				value: "", 
				placeholder: "Fun, Sincere, and Excited", 
				label: "The tone the email will be generated in",
				// type: "textarea",
				maxLength: 100,
				// max: 100,
				// min: 4,
				// required: true,
				error: "",
				example: "Fun, Sincere, and Excited",
			},
			{ 
				title: "Description", 
				attr: "description",  
				value: "", 
				placeholder: "Setup a call to talk about investment opportunity...", 
				label: "What does this email hope to accomplish?",
				type: "textarea",
				maxLength: 600,
				// max: 100,
				// min: 100,
				// required: true,
				error: "",
				example: "Setup a call to talk about investment opportunity.",
			},
		],
		example: {
			output: "Dear Unions,\n  I hope this message finds you well! I'm an experienced financial advisor serving investment needs throughout the nation.  I wanted to reach out to you to discuss an invaluable investment opportunity that could create a long-term revenue stream for you and your members.   We all know the strength of unions is found in the ability to deliver greater benefits to members, and I believe this is just the type of opportunity to do that. I would love to have a conversation with you and your team to discuss further.   I’m excited to learn more about any questions or concerns you may have and to get to know your team better. If you're interested in learning more, please reply to this message and I’ll promptly schedule a call.   I look forward to hearing from you soon.\n   Best regards,  [Your Name]",
			// outputs: [],
			// Icon: RefreshIcon,
			// color: "",
		}
	}]
		
}

export default obj

