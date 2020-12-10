import {
	IonBadge,
	IonButtons,
	IonContent,
	IonHeader,
	IonIcon,
	IonLabel,
	IonMenuButton,
	IonPage,
	IonProgressBar,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import {
	heartOutline,
	thermometerSharp,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Redirect, Route, useParams } from "react-router";
import { db } from "../config";
import "./Card.css";
import { useLocation } from "react-router-dom";
import Temp from "../tabs/Temp";
import HeartRate from "../tabs/Hr";
import { IonReactRouter } from "@ionic/react-router";
const Card: React.FC = () => {
	const { name } = useParams<{ name: string }>();
	const [values, setValues] = useState({
		data: [] as any,
		isLoaded: false,
	});

	const location = useLocation();

	useEffect(() => {
		let ref = db.ref("/" + name);
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
	}, [name]);
	if (values.isLoaded) {
		return (
			<IonPage>
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton />
						</IonButtons>
						<IonTitle>{name}</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonContent fullscreen className="content">
					<IonReactRouter>
						<IonTabs>
							<IonRouterOutlet>
								<Route
									path={location.pathname + "/tabs/temp"}
									exact={true}
									render={(props) => <Temp {...props} />}
									component={Temp}
								/>
								<Route
									path={location.pathname + "/tabs/heart-rate"}
									render={(props) => <HeartRate {...props} />}
									component={HeartRate}
								/>
								<Route
									path="/page/bracelets"
									render={() => (
										<Redirect to={location.pathname + "/tabs/temp"} />
									)}
									exact={true}
								/>
							</IonRouterOutlet>
							<IonTabBar slot="bottom">
								<IonTabButton
									tab="temp"
									href={location.pathname + "/tabs/temp"}
								>
									<IonIcon icon={thermometerSharp} />
									<IonLabel>Temperature</IonLabel>
									<IonBadge>6</IonBadge>
								</IonTabButton>

								<IonTabButton
									tab="heart-rate"
									href={location.pathname + "/tabs/heart-rate"}
								>
									<IonIcon icon={heartOutline} />
									<IonLabel>Heart rate</IonLabel>
								</IonTabButton>
							</IonTabBar>
						</IonTabs>
					</IonReactRouter>
					{}
				</IonContent>
			</IonPage>
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

export default Card;
