"""Regenerate the EGT classification figures from _data/egt.yml (requires matplotlib and PyYAML)."""
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import PercentFormatter
from matplotlib.patches import Rectangle
import yaml

ROOT = Path(__file__).resolve().parents[1]
ROWS = yaml.safe_load((ROOT / '_data/egt.yml').read_text())['classification']
OUTPUT = ROOT / 'assets/egt'
METRICS = {
    'rejection': ('Successful paths incorrectly rejected', 'Lower is better'),
    'acceptance': ('Failed executions incorrectly accepted', 'Lower is better'),
    'accuracy': ('Classification accuracy', 'Higher is better'),
}
COLORS = ['#71817a', '#3974ad', '#3974ad', '#3974ad', '#ae7941', '#286557']
POSITIONS = [6.6, 5.2, 4.35, 3.5, 2.0, .6]
plt.rcParams.update({'font.family': 'DejaVu Sans', 'svg.fonttype': 'none', 'axes.labelcolor': '#263b31', 'text.color': '#263b31'})

for metric, (title, direction) in METRICS.items():
    for mobile in [False, True]:
        fig, ax = plt.subplots(figsize=(4.8, 5.7) if mobile else (11, 4.7))
        fig.subplots_adjust(left=.44 if mobile else .30, right=.96, bottom=.14, top=.96)
        fig.set_facecolor('white')
        ax.set_facecolor('white')
        ax.add_patch(Rectangle((0, 3.04), 118, 2.62, facecolor='#eef4fa', edgecolor='none', zorder=0))
        values = [row[metric] for row in ROWS]
        ax.barh(POSITIONS, values, height=.43, color=COLORS, zorder=3)
        labels = ['Force-angle', '45°', '60°', '75°', 'EGT without\npose–contact prior', 'EGT (ours)']
        ax.set_yticks(POSITIONS, labels, fontsize=12 if mobile else 12.5)
        for label in ax.get_yticklabels():
            if label.get_text() == 'EGT (ours)':
                label.set_fontweight('bold')
                label.set_color('#286557')
        ax.tick_params(axis='y', length=0, pad=11, colors='#263b31')
        ax.set_ylim(-.1, 7.25)
        ax.set_xlim(0, 118 if mobile else 108)
        ax.set_xticks([0, 25, 50, 75, 100])
        ax.xaxis.set_major_formatter(PercentFormatter(xmax=100, decimals=0))
        ax.tick_params(axis='x', labelsize=9 if mobile else 10, colors='#46544e', length=0, pad=9)
        ax.xaxis.grid(True, color='#dce5df', linewidth=.8, zorder=1)
        ax.set_axisbelow(True)
        for spine in ax.spines.values(): spine.set_visible(False)
        for y, value, color in zip(POSITIONS, values, COLORS):
            ax.text(value + 1.7, y, f'{value:.1f}%', va='center', fontsize=11 if mobile else 12, color=color if color=='#286557' else '#263b31', fontweight='bold' if color=='#286557' else 'normal')
        # A single bracket identifies the three parameter settings as one method.
        bracket_x = -.28 if mobile else -.14
        trans = ax.get_yaxis_transform()
        ax.plot([bracket_x+.025, bracket_x, bracket_x, bracket_x+.025], [5.55,5.55,3.15,3.15], transform=trans, color='#3974ad', linewidth=1.8, clip_on=False)
        ax.text(bracket_x-.045,4.35,'Pose-margin',ha='right',va='center',transform=trans,fontsize=10.5 if mobile else 12,color='#275f95',fontweight='bold')
        ax.set_xlabel('Percentage (%)', fontsize=11, labelpad=13)
        filename = f'classification-{metric}'+('-mobile' if mobile else '')+'.svg'
        fig.savefig(OUTPUT / filename,format='svg',metadata={'Title':f'{title} (%) — {direction}. EGT paper, Table I.'})
        plt.close(fig)
print('Rendered classification plots for three metrics at desktop and mobile sizes.')
