import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Draft Caption for Article",
	desc: "Draft a caption based on an article.",
	category: "Written Content",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "yellow-400",
	toColor: "yellow-600",

	to: "/ai/writing/caption",
	api: "/ai/writing/caption",

	output: {
		title: "Caption",
		desc: "The following caption has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Article",
		desc: "Paste the contents of your article",
		// n: 1,
		prompts: [
			{ 
				title: "", 
				attr: "article",  
				value: "", 
				placeholder: "", 
				label: "?",
				type: "textarea",
				maxLength: 1200,
				// max: 100,
				// min: 100,
				// required: true,
				error: "",
				example: "",
			},
		],
		example: {
		}
	}]
		
}

export default obj

