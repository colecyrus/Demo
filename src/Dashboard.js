import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { observer, inject } from 'mobx-react';
import MainBody from './Components/Body';

@inject('store')
@observer
class Body extends Component {
	renderCategoryTools(category) {
		const { tools, profile } = this.props.store;
		const filteredTools = tools.filter(tool =>
			tool.permissions.some(r => profile.permissions.includes(r))
		);
		const categoryTools = filteredTools.filter(tool => tool.category === category);
		console.log(categoryTools)
		if (categoryTools.length === 0) {
			return null; // Don't render anything if there are no tools in the category
		}

		return (
			<>
				<Title title={category} />
				<Grid>
					{categoryTools.map((tool, index) => (
						<Tool
							key={tool.id} // Use a unique identifier as the key prop
							group={tool.category}
							title={tool.title}
							to={tool.to}
							Icon={tool.Icon}
							desc={tool.desc}
							fromColor={tool.fromColor}
							toColor={tool.toColor}
						/>
					))}
				</Grid>
				<Divider />
			</>
		);
	}

	render() {
		return (
			<>
				<Helmet>
					<title>{`Deep Forest AI`}</title>
				</Helmet>
				<MainBody className="px-4 py-4 md:px-28 md:py-8 lg:py-12">
					{this.renderCategoryTools('Written Content')}
					{this.renderCategoryTools('Business')}
					{this.renderCategoryTools('Personal')}
				</MainBody>
			</>
		);
	}
}

export const Divider = () => (
	<div className="divide-y-2 divide-dashed divide-gray-300 py-8 md:py-12">
		<div></div>
		<div></div>
	</div>
);

export const Title = ({ title }) => (
	<h2 className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 md:mb-6">{title}</h2>
);

export const Grid = ({ children }) => (
	<div className="grid grid-cols-1 gap-8 mt-4 lg:grid-cols-2 xl:grid-cols-3">{children}</div>
);

export const Tool = ({ Icon, title, desc, to, group, fromColor, toColor }) => (
	<Link to={to || '/'} className="flex relative">
		<div
			className={`bg-white flex-1 rounded-xl transition hover:shadow-md overflow-hidden md:max-w-1lg text-gray-500 cursor-pointer border border-gray-300 md:flex relative transform hover:scale-105  hover:text-black`}
		>
			<div className="p-4">
				<div
					className={`uppercase tracking-wide text-sm text-${fromColor ? fromColor : 'green-500'
						} font-semibold leading-none`}
				>
					{group || 'New'}
				</div>
				<div className="block text-lg xl:text-xl 2xl:text-2xl leading-tight font-medium text-black leading-none">
					{title}
				</div>
				<p className="mt-1 pr-1 text-sm">{desc}</p>
			</div>
		</div>
	</Link>
);

export default Body;
