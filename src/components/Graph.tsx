import React, { useEffect } from "react";
//import logo from './logo.svg';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

const Graph = (props: any) => {
	useEffect(() => {
		const chart = am4core.create("chartdiv", am4charts.XYChart);
		chart.fill = am4core.color("white").lighten(0.5);
		chart.stroke = am4core.color("white").lighten(-0.5);

		chart.paddingRight = 20;

		let data: any = [];
		let new_data = props.values;
		let variable = props.variable;
		//let visits = 10;
		new_data.forEach((element: any) => {
			let year, month, day, hours, minutes;
			if (variable === "temp") {
				year = element.date.slice(0, 4);
				month = element.date.slice(5, 7);
				day = element.date.slice(8, 11);
				hours = element.date.slice(14, 16);
				minutes = element.date.slice(17, 19);
			} else {
				year = element.date.slice(0, 4);
				month = element.date.slice(5, 7);
				day = element.date.slice(8, 11);
				hours = element.date.slice(11, 13);
				minutes = element.date.slice(14, 16);
			}
			data.push({
				date: new Date(year, month, day, hours, minutes),
				value: variable === "temp" ? element.temp : element.heartRate,
			});
		});

		chart.data = data;

		let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.baseInterval = {
			timeUnit: "minute",
			count: 1,
		};
		dateAxis.renderer.grid.template.location = 0;

		let valueAxis: any = chart.yAxes.push(new am4charts.ValueAxis());

		valueAxis.tooltip.disabled = true;
		//valueAxis.renderer.minWidth = 35;

		let series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.dateX = "date";
		series.dataFields.valueY = "value";

		series.tooltipText = "{valueY.value}";
		chart.cursor = new am4charts.XYCursor();

		let scrollbarX = new am4charts.XYChartScrollbar();
		scrollbarX.series.push(series);
		chart.scrollbarX = scrollbarX;
	});

	return <div id="chartdiv" style={{ width: "100%", height: "75vh" }}></div>;
};

export default Graph;
