export const getRaftType = (summary: string) => {
    summary = summary.toLowerCase();
    if (summary.includes('single')) {
        return 'single-kayak';
    } else if (summary.includes('double')) {
        return 'double-kayak';
    } else if (summary.includes('small raft')) {
        return 'small-raft';
    } else if (summary.includes('round raft')) {
        return 'round-raft';
    } else if (summary.includes('medium raft')) {
        return 'medium-raft';
    } else if (summary.includes('large raft')) {
        return 'large-raft';
    } else {
        return '';
    }
};