import React, { useEffect, useState } from "react";
import "./ExploreContainer.css";
import { db } from "../config";
import {
	IonItem,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
	IonList,
	IonProgressBar,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

interface ContainerProps {
	name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
	const history = useHistory();
	const [data, setDataDB] = useState({
		keys: [] as any,
		isLoaded: false,
	});
	const handleClick = (name: string) => {
		history.push("/bracelet/" + name);
	};
	useEffect(() => {
		let ref = db.ref();
		ref.on("value", getData, errData);
		function getData(data: any) {
			let todos = data.val();
			let keys = Object.keys(todos);
			console.log(keys);
			setDataDB({
				...data,
				isLoaded: true,
				keys: keys,
			});
		}

		function errData(err: any) {
			console.log("Error !!");
			console.log(err);
		}
	}, []);
	if (data.isLoaded) {
		return (
			<div className="container">
				<strong>{name}</strong>
				<IonList>
					{data.keys.map((_el: any, index: any) => {
						return (
							<IonItemSliding key={index}>
								<IonItem onClick={() => handleClick(_el)}>
									<IonLabel>{_el}</IonLabel>
								</IonItem>
								<IonItemOptions side="end"></IonItemOptions>
							</IonItemSliding>
						);
					})}
				</IonList>
			</div>
		);
	} else {
		return (
			<div>
				{" "}
				<IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
				<br />
			</div>
		);
	}
};

export default ExploreContainer;
