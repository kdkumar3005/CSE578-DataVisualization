# Homework #5: (Pick One) Innovative Vis Design OR Argumentative Vis

For homework #5, you have two options. You can either do the Innovative Vis Design assignemnt, OR you can do the Argumentative Vis assignment. The directions for both are below. This assignment is worth 10 points.

---

## Innovative Visualization Design (Option #1)

For option #1, you will create a unique or customized visualization that goes beyond the "common chart types" that you already exist. 

The audience for this visualization is visitors to a musuem. The goal is to create a visualization exhibit that communicates certain aspects of the data effectively and in a creative manner, as opposed to supporting in-depth analysis such as might be done by domain experts.

The dataset that your museum curators wants you to visualize is the [Soviet Space Dogs](https://airtable.com/universe/expG3z2CFykG1dZsp/sovet-space-dogs?explore=true) dataset. This dataset contains two tables:

- Dogs: 48 dogs who participated in the Soviet space program in the 1950s and 1960s.
- Flights: 42 missions that the dogs flew on.

### Innovative Visualization Design Requirements

- Create a page `index.html` in this repostory for storing your visualization. Put your downloaded dataset into a `data/` folder.
- Create a unique D3 visualization (or infographic) that is not simply an existing technique or D3 block.
    - You may import existing code, or use an existing technique as a "base," but you must document what modifications you make in your writeup, and you should substantially change any imported code that you build upon. If you're unsure what constitutes substantial, talk to the TA.
    - Charts and techiques we discuss in class would not be considered custom/innovative, for example, but could be used as the "base."
- You must visualize at least three different attributes, including one quantatitive and one categorical attribute. (Temporal attributes count as quantative.)
- You are not required to visualize all of the given data. You may focus on a specific topic or question that you want to address, and therefore you might only need to look at a subset of the data (attributes or items) to answer it.
- One approach for creating a unique visualization is to create custom glyphs. Here are some examples that can provide inspiration.
    - [lalettura](http://giorgialupi.com/lalettura)
    - [film flowers](https://shirleywu.studio/filmflowers/)
    - [Visualizing Painters' Lives](http://giorgialupi.com/visualizing-painters-lives)
    - [How's Life?](https://www.oecdbetterlifeindex.org/#/31111111111)
    - [Where the Wild Bess Are](https://www.scientificamerican.com/article/where-the-wild-bees-are/)
    - [Giorgia Lupi and Stefanie Posavec’s Life Data Visualizations](https://www.moma.org/magazine/articles/309)
    - [The Metropolitan Museum Partnership 2019](https://parsons.nyc/met-museum-2019/)
    - [VISAP'22](https://visap.net/2022/programme)
- You may choose to create either a static or interactive visualization.
- Above your chart/infographic, add a title and short description that explains your design (i.e., what your marks are, what your channels are, and what are the interactions (if there are any)).
- If you modified an existing block, below the visualization provide a link to the original source code and describe (in detail) how you modified it to create your chart.

You are free (and encouraged!) to be creative on this assignment, including the use of abstract, artistic, and illustrative designs. Don't submit just a basic D3 block (bar chart, scatterplot, pie/donut chart, line chart, node-link diagram, tree, etc.), or you'll receive a 0 on this assignment. 

### Innovative Visualization Design Grading

If you choose this option, grading will be based on following the above directions, and creating an interesting and insightful visualization/exhibit that goes beyond basic D3/vis techniques. Especially creative or interesting submissions are eligible for up to +2 points extra credit.

---

## Argumentative Vis (Option #2)

For option #2, you will create a pair of data visualizations that argue for opposing viewpoints, with the catch that these visualizations use the same base/underlying dataset.

Your completed submission should include the following files:

- `index.html`: The webpage and your visualizations.
- `data/`: Put the dataset you are using in here.
- Any other necessary files (JS, CSS, etc.)

If your dataset is larger than 10 MB, please only extract the portions needed for the visualizations.

### Argumentative Vis Requirements

Using techniques from the Storytelling lecture and the [visualization rhetoric paper](http://users.eecs.northwestern.edu/~jhullman/vis_rhetoric.pdf), you will create two visualizations about a dataset that frame the data with opposite narratives.

First, find a dataset about a "controversial" topic. In other words, you want a topic with strong opinions on both sides of the issue. Here are some examples of topics that could work: a political issue, science, religion, sociocultural, economics, immigration, sports, climate change, geopolitical sovereignty, etc. Topics from other regions or countries are also allowed. Good places to look for this data include Kaggle and news organizations that provide access to their data (538, New York Times, etc.).

> COVID-19 datasets are NOT allowed, though, you are free to look at examples of opposing COVID visualizations for inspiration.

Next, create your `index.html` page with two visualizations placed side-by-side (one on the left, one on the right). The two visualizations should use the same base dataset. Not all attributes are required to be the the same, and you are free to preprocess the data differently for each visualization (if desired), including aggregating data, filtering data, etc. but use the same source must be used. (In other words, you cannot go find two datasts and merge them together.) One visualization should be rhetorically framed to argue "in support" of a viewpoint, and the other visualization should be rhetorically framed to argue against the viewpoint. 

> 🔍 A good way to consider this is like a debate, where your two visualizations are two opposite answers or positions on an issue or question. The left-visualization can support the "Yes" answer, and the right-visualization supports the opposite "No" answer.

Again, the trick is that you will use the _same base dataset_ for both visualizations, and you'll employ rhetorical techniques to help frame the data in opposing ways. Some examples of how you might do this include: filtering some of the data, picking different attributes to show, using diffrent ranges (timescales, etc), using different granularities, clustering or binning the data, using text annotating on the charts, picking colors or channels to emphasize some aspect of the data. You're allowed to pre-process the data or break up the data into multiple files if necessary. 

[The visualization rhetoric](http://users.eecs.northwestern.edu/~jhullman/vis_rhetoric.pdf) that we discussed in class describes an extensive collection of framing and styling techniques you can use to help frame a visualization to promote a specific viewpoint, story, or argument. You can also refer to the lecture slides for ideas of specific rhetorical techniques. Again, your frame of mind if you choose this option should be like a debate: one team argues the affirmative position, while the other argues the negative. For this assigment, you'll argue both sides. 

You are free to use any visualization techniques and rhetorical framing devices you like, but you should only create ONE main visualization for each side. (In other words, don’t make a collection of several charts, or an infographic, to argue Yes or No, just have one for each side. However, it’s okay to inset or annotate a smaller chart within your primary chart.)

Above the charts, add a title (or question) that describes the debate topic, and provide a link to the dataset source. At the bottom of each chart, add a brief title or caption about each chart (this caption can also be argumentative!). Then, below that, provide the following paragraphs.

- Introduce the topic: Provide a brief (3-4 sentence) description of the chosen topic. In other words, if I'm not familiar with the topic, introduce it here. If you'd like, you may state your personal position on the topic, though that's not required.

- Left chart: Describe the argument of the left chart, and describe the rhetorical techniques you are using in this chart, and how they are persuasive to the intended argument. For full points, you should explicitly reference techniques from the lecture/paper.

- Right chart: Provide a similar writeup for the right chart.

### Argumentative Vis Grading 

This assignment is worth 10 points, based on adhering to the above directions, and in creating nice looking and persuasive visualizations. Be sure to organize and lay out your page nicely, with nicely styled elements. Up to +2 bonus points will be considered for submissions that go above and beyond (e.g., creating particularly compelling or impressive argumentative visualizations).

