import {
	IonContent,
	IonCol,
	IonGrid,
	IonProgressBar,
	IonRow,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import Graph from "../components/Graph";
import { db } from "../config";

const HeartRate = (props: any) => {
	const [values, setValues] = useState({
		data: [] as any,
		isLoaded: false,
	});

	useEffect(() => {
		const name = props.location.pathname.slice(10, 27);
		let ref = db.ref("/" + name + "/heartrate");
		ref.on("value", getData, errData);
		function getData(data: any) {
			let todos = data.val();
			setValues({
				...data,
				isLoaded: true,
				data: Object.values(todos),
			});
		}
		function errData(err: any) {
			console.log("Error !!");
			console.log(err);
		}
	}, [props.location.pathname]);
	if (values.isLoaded) {
		return (
			<IonContent>
				<IonGrid>
					<Graph values={values.data} variable="heartRate"></Graph>{" "}
					{values.data.map((_el: any, index:any) => {
						return (
							<IonRow key={index}>
								<IonCol>{_el.heartRate}</IonCol>
								<IonCol>{_el.date}</IonCol>
							</IonRow>
						);
					})}
				</IonGrid>
			</IonContent>
		);
	} else {
		return (
			<IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
		);
	}
};
export default HeartRate;
