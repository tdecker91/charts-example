import { Component, OnInit, OnDestroy, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";

const treeData = {
  name: "Top Level",
  children: [
    {
      name: "Level 2: A",
      children: [{ name: "Son of A" }, { name: "Daughter of A" }]
    },
    { name: "Level 2: B" }
  ]
};

@Component({
  selector: "app-d3-charts",
  templateUrl: "./d3-charts.component.html",
  styleUrls: ["./d3-charts.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class D3ChartsComponent implements OnInit, OnDestroy {
  margin = { top: 20, right: 120, bottom: 20, left: 120 };
  width = 960 - this.margin.right - this.margin.left;
  height = 500 - this.margin.top - this.margin.bottom;

  i = 0;
  duration = 750;
  root: any;

  tree: any;
  diagonal: any;
  svg: d3.Selection<any, any, any, any>;

  ngOnDestroy() {
    this.svg.remove();
  }

  ngOnInit() {
    // Set the dimensions and margins of the diagram
    let margin = { top: 20, right: 90, bottom: 30, left: 90 };
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    this.svg = d3
      .select("#d3-chart")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let i = 0;
    let duration = 750;
    let root;

    // declares a tree layout and assigns the size
    let treemap = d3.tree().size([height, width]);

    // Assigns parent, children, height, depth
    root = d3.hierarchy(treeData, d => {
      return d.children as any;
    });
    root.x0 = height / 2;
    root.y0 = 0;

    let update = (source) => {
      // Assigns the x and y position for the nodes
      let treeData = treemap(root);

      // Compute the new tree layout.
      let nodes = treeData.descendants();
      let links = treeData.descendants().slice(1);

      // Normalize for fixed-depth.
      nodes.forEach((d) => {
        d.y = d.depth * 180;
      });

      // ****************** Nodes section ***************************

      // Update the nodes...
      let node = this.svg.selectAll("g.node").data(nodes, (d: any) => {
        return d.id || (d.id = ++i);
      });

      // Enter any new modes at the parent's previous position.
      let nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", (d) => {
          return "translate(" + source.y0 + "," + source.x0 + ")";
        })
        .on("click", click);

      // Add Circle for the nodes
      nodeEnter
        .append("circle")
        .attr("class", "node")
        .attr("r", 1e-6)
        .style("fill", (d: any) => {
          return d._children ? "lightsteelblue" : "#fff";
        });

      // Add labels for the nodes
      nodeEnter
        .append("text")
        .attr("dy", ".35em")
        .attr("x", (d: any) => {
          return d.children || d._children ? -13 : 13;
        })
        .attr("text-anchor", (d: any) => {
          return d.children || d._children ? "end" : "start";
        })
        .text((d: any) => {
          return d.data.name;
        });

      // UPDATE
      let nodeUpdate = nodeEnter.merge(node as any);

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr("transform", (d) => {
          return "translate(" + d.y + "," + d.x + ")";
        });

      // Update the node attributes and style
      nodeUpdate
        .select("circle.node")
        .attr("r", 10)
        .style("fill", (d: any) => {
          return d._children ? "lightsteelblue" : "#fff";
        })
        .attr("cursor", "pointer");

      // Remove any exiting nodes
      let nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr("transform", (d) => {
          return "translate(" + source.y + "," + source.x + ")";
        })
        .remove();

      // On exit reduce the node circles size to 0
      nodeExit.select("circle").attr("r", 1e-6);

      // On exit reduce the opacity of text labels
      nodeExit.select("text").style("fill-opacity", 1e-6);

      // ****************** links section ***************************

      // Update the links...
      let link = this.svg.selectAll("path.link").data(links, (d: any) => {
        return d.id;
      });

      // Enter any new links at the parent's previous position.
      let linkEnter = link
        .enter()
        .insert("path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
          var o = { x: source.x0, y: source.y0 };
          return diagonal(o, o);
        });

      // UPDATE
      var linkUpdate = linkEnter.merge(link as any);

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          return diagonal(d, d.parent);
        });

      // Remove any exiting links
      var linkExit = link
        .exit()
        .transition()
        .duration(duration)
        .attr("d", function(d) {
          var o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach(function(d: any) {
        d.x0 = d.x;
        d.y0 = d.y;
      });

      // Creates a curved (diagonal) path from parent to the child nodes
      function diagonal(s, d) {
        let path = `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`;

        return path;
      }

      // Toggle children on click.
      function click(d) {
        if (d.children) {
          d._children = d.children;
          d.children = null;
        } else {
          d.children = d._children;
          d._children = null;
        }
        update(d);
      }
    }

    update(root);
  }
}
