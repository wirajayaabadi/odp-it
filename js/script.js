document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.querySelector('.chart-container');

    const chartData = [
        { month: 'Aug', value: 8000 },
        { month: 'Sep', value: 10000 },
        { month: 'Oct', value: 7000 },
        { month: 'Nov', value: 4500 },
        { month: 'Dec', value: 12500 }, // Ini yang akan aktif
        { month: 'Jan', value: 6000 }
    ];

    const maxValue = Math.max(...chartData.map(data => data.value));
    const chartHeightPx = 250; // Sesuai dengan tinggi .chart-container di CSS

    chartData.forEach(data => {
        const barWrapper = document.createElement('div');
        barWrapper.classList.add('bar-wrapper');

        const bar = document.createElement('div');
        bar.classList.add('bar');

        // Hitung tinggi batang secara proporsional
        const barHeight = (data.value / maxValue) * (chartHeightPx - 50); // Kurangi sedikit untuk memberi ruang pada teks di atas
        bar.style.height = `${barHeight}px`;

        const valueDisplay = document.createElement('div');
        valueDisplay.classList.add('value-display');
        valueDisplay.textContent = `$${data.value.toLocaleString()}`; // Format angka

        const barLabel = document.createElement('div');
        barLabel.classList.add('bar-label');
        barLabel.textContent = data.month;

        barWrapper.appendChild(valueDisplay); // Tambahkan value-display di atas bar
        barWrapper.appendChild(bar);
        barWrapper.appendChild(barLabel);

        // Tambahkan kelas 'selected' ke batang yang sesuai dengan gambar
        if (data.month === 'Dec') {
            bar.classList.add('selected');
        }

        // Event listener untuk menunjukkan/menyembunyikan nilai saat hover (opsional, karena .selected sudah menampilkannya)
        bar.addEventListener('mouseenter', () => {
            // Jika tidak ingin menampilkan untuk semua hover, bisa tambahkan kondisi !bar.classList.contains('selected')
            valueDisplay.style.opacity = '1';
        });

        bar.addEventListener('mouseleave', () => {
            if (!bar.classList.contains('selected')) {
                valueDisplay.style.opacity = '0';
            }
        });

        chartContainer.appendChild(barWrapper);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const transactionsData = [
        {
            description: 'Spotify Subscription',
            transactionId: '#12548796',
            type: 'Shopping',
            card: '1234 ****',
            date: '28 Jan, 12.30 AM',
            amount: -2500,
            receipt: 'Download'
        },
        {
            description: 'Freepik Sales',
            transactionId: '#12548796',
            type: 'Transfer',
            card: '1234 ****',
            date: '25 Jan, 10.40 PM',
            amount: 750,
            receipt: 'Download'
        },
        {
            description: 'Mobile Service',
            transactionId: '#12548796',
            type: 'Service',
            card: '1234 ****',
            date: '20 Jan, 10.40 PM',
            amount: -150,
            receipt: 'Download'
        },
        {
            description: 'Wilson',
            transactionId: '#12548796',
            type: 'Transfer',
            card: '1234 ****',
            date: '15 Jan, 03.29 PM',
            amount: -1050,
            receipt: 'Download'
        },
        {
            description: 'Emilly',
            transactionId: '#12548796',
            type: 'Transfer',
            card: '1234 ****',
            date: '14 Jan, 10.40 PM',
            amount: 840,
            receipt: 'Download'
        },
        {
            description: 'Netflix Subscription',
            transactionId: '#12548797',
            type: 'Entertainment',
            card: '5678 ****',
            date: '12 Jan, 09.00 PM',
            amount: -120,
            receipt: 'Download'
        },
        {
            description: 'Salary',
            transactionId: '#12548798',
            type: 'Income',
            card: '9012 ****',
            date: '10 Jan, 08.00 AM',
            amount: 5000,
            receipt: 'Download'
        },
        {
            description: 'Groceries',
            transactionId: '#12548799',
            type: 'Shopping',
            card: '3456 ****',
            date: '08 Jan, 05.15 PM',
            amount: -300,
            receipt: 'Download'
        },
        {
            description: 'Refund from Amazon',
            transactionId: '#12548800',
            type: 'Refund',
            card: '7890 ****',
            date: '05 Jan, 11.00 AM',
            amount: 50,
            receipt: 'Download'
        },
        {
            description: 'Utilities Bill',
            transactionId: '#12548801',
            type: 'Bills',
            card: '1122 ****',
            date: '02 Jan, 02.00 PM',
            amount: -80,
            receipt: 'Download'
        }
    ];

    const transactionsPerPage = 5;
    let currentPage = 1;
    let currentFilter = 'all'; // 'all', 'income', 'expense'

    const transactionRows = document.getElementById('transaction-rows');
    const tabButtons = document.querySelectorAll('.tab-button');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');

    function renderTable(dataToRender, page) {
        transactionRows.innerHTML = ''; // Clear existing rows
        const start = (page - 1) * transactionsPerPage;
        const end = start + transactionsPerPage;
        const paginatedData = dataToRender.slice(start, end);

        paginatedData.forEach(transaction => {
            const row = document.createElement('tr');

            const amountClass = transaction.amount < 0 ? 'expense' : 'income';
            const amountText = transaction.amount < 0 ? `-${Math.abs(transaction.amount).toLocaleString('en-US')}` : `+${transaction.amount.toLocaleString('en-US')}`;
            const iconClass = transaction.amount < 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
            const iconBgClass = transaction.amount < 0 ? 'expense' : 'income'; // For background color of icon

            row.innerHTML = `
                <td>
                    <div class="transaction-icon ${iconBgClass}">
                        <i class="${iconClass}"></i>
                    </div>
                    ${transaction.description}
                </td>
                <td>${transaction.transactionId}</td>
                <td>${transaction.type}</td>
                <td>${transaction.card}</td>
                <td>${transaction.date}</td>
                <td class="amount ${amountClass}">${transaction.amount < 0 ? '-' : ''}$${Math.abs(transaction.amount).toLocaleString('en-US')}</td>
                <td><button class="receipt-button">${transaction.receipt}</button></td>
            `;
            transactionRows.appendChild(row);
        });
    }

    function renderPagination(dataToRender) {
        pageNumbersContainer.innerHTML = '';
        const totalPages = Math.ceil(dataToRender.length / transactionsPerPage);

        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.classList.add('page-number');
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                filterAndRender();
            });
            pageNumbersContainer.appendChild(pageButton);
        }
    }

    function filterAndRender() {
        let filteredData = [];
        if (currentFilter === 'all') {
            filteredData = transactionsData;
        } else if (currentFilter === 'income') {
            filteredData = transactionsData.filter(t => t.amount > 0);
        } else if (currentFilter === 'expense') {
            filteredData = transactionsData.filter(t => t.amount < 0);
        }

        renderTable(filteredData, currentPage);
        renderPagination(filteredData);
    }

    // Tab functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentFilter = button.dataset.tab;
            currentPage = 1; // Reset to first page on tab change
            filterAndRender();
        });
    });

    // Pagination navigation
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            filterAndRender();
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const filteredData = currentFilter === 'all' ? transactionsData :
                             currentFilter === 'income' ? transactionsData.filter(t => t.amount > 0) :
                             transactionsData.filter(t => t.amount < 0);
        const totalPages = Math.ceil(filteredData.length / transactionsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            filterAndRender();
        }
    });

    // Initial render
    filterAndRender();
});