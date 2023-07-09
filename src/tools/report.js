import {
	MenuAlt2Icon,
} from '@heroicons/react/solid'


const obj = {

	title: "Research Company",
	desc: "Generates a financial report on a given company.",
	category: "Business",
	Icon: MenuAlt2Icon,
	// tags: [],
	permissions: ['user'],
	
	fromColor: "blue-600",
	toColor: "yellow-500",

	to: "/ai/business/report",
	api: "/ai/business/report",

	output: {
		title: "Report",
		desc: "The following report has been generated",
		// Icon: RefreshIcon,
		// color: "",
	},

	prompts: [{
		title:"Report",
		desc: "Name of the comapany",
		// n: 1,
		prompts: [
			{ 
				title: "", 
				attr: "company",  
				value: "", 
				placeholder: "", 
				label: "?",
				type: "textarea",
				maxLength: 1200,
				error: "",
				example: "",
			},
		],
		example: {
		}
	}]
		
}

export default obj

